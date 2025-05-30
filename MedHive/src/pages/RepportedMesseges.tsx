import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../Components/RpptMsg";
import Adminsidebar from "../components/Adminsidebar";
import SearchBar from "../components/Searchbaradmin";

import NotificationButton from "../components/Notifications";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FiChevronLeft,
  FiChevronRight,
  FiTrash2,
  FiDownload,
  FiAlertTriangle,
  FiExternalLink,
} from "react-icons/fi";

interface ReportedMessage {
  _id: string;
  contenu: string;
  author: string;
  contact: string;
  location: string;
  productName: string;
  price: number | string;
  description: string;
  produitId?: string;
  notificationId: string;
}

const ReportedMessages = () => {
  const [messages, setMessages] = useState<ReportedMessage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [processingAction, setProcessingAction] = useState(false);
  const [] = useState("");
  const [confirmBulkDelete, setConfirmBulkDelete] = useState(false);

  useEffect(() => {
    const fetchReportedMessages = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<
          {
            type: string;
            message: any;
            signalePar?: { username?: string; email?: string };
            _id: string;
            produitId?: string;
          }[]
        >("/api/utilisateur/gestionAdmin/obtenirNotifications", {
          withCredentials: true,
        });

        const reportedMessages = response.data
          .filter(
            (notif: any) =>
              notif.type === "signalement_message" && notif.message
          )
          .map((notif: any) => ({
            _id: notif.message._id,
            contenu: notif.message.contenu,
            author: notif.signalePar?.username || "Anonymous",
            contact: notif.signalePar?.email || "No contact",
            location: notif.message.location || "Unknown",
            productName: notif.message.produitNom || "Reported Message",
            price: notif.message.produitPrix || "N/A",
            description: notif.message.contenu,
            produitId: notif.message.produitId,
            notificationId: notif._id,
          }));

        setMessages(reportedMessages);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching reported messages:", error);
        toast.error("Failed to load reported messages");
        setIsLoading(false);
      }
    };

    fetchReportedMessages();
  }, []);

  const handleDelete = async () => {
    if (processingAction || !messages.length) return;

    try {
      setProcessingAction(true);
      const currentMessage = messages[currentIndex];

      await axios.post(
        `/api/utilisateur/gestionAdmin/traiterSignalement/${currentMessage.notificationId}`,
        { action: "approuver" },
        { withCredentials: true }
      );

      if (currentMessage.produitId) {
        try {
          await axios.delete(`/api/produits/${currentMessage.produitId}`, {
            withCredentials: true,
          });
        } catch (produitError) {
          console.error("Error deleting product:", produitError);
          toast.error("Failed to delete linked product");
        }
      }

      const updated = messages.filter((_, i) => i !== currentIndex);
      setMessages(updated);
      setCurrentIndex((prev) => {
        if (updated.length === 0) return 0;
        return prev >= updated.length ? updated.length - 1 : prev;
      });

      toast.success("Message deleted successfully");
    } catch (error) {
      console.error("Error deleting message:", error);
      toast.error("Failed to delete message");
    } finally {
      setProcessingAction(false);
    }
  };

  const handleIgnore = async () => {
    if (processingAction || !messages.length) return;

    try {
      setProcessingAction(true);

      await axios.post(
        `/api/utilisateur/gestionAdmin/traiterSignalement/${messages[currentIndex].notificationId}`,
        { action: "refuser" },
        { withCredentials: true }
      );

      const updated = messages.filter((_, i) => i !== currentIndex);
      setMessages(updated);
      setCurrentIndex((prev) => {
        if (updated.length === 0) return 0;
        return prev >= updated.length ? updated.length - 1 : prev;
      });

      toast.success("Report ignored successfully");
    } catch (error) {
      console.error("Error ignoring report:", error);
      toast.error("Failed to ignore report");
    } finally {
      setProcessingAction(false);
    }
  };

  const handleBulkDelete = async () => {
    if (processingAction || !messages.length) return;

    try {
      setProcessingAction(true);

      for (const message of messages) {
        await axios.post(
          `/api/utilisateur/gestionAdmin/traiterSignalement/${message.notificationId}`,
          { action: "approuver" },
          { withCredentials: true }
        );

        if (message.produitId) {
          try {
            await axios.delete(`/api/produits/${message.produitId}`, {
              withCredentials: true,
            });
          } catch (error) {
            console.error(
              `Failed to delete product ${message.produitId}:`,
              error
            );
          }
        }
      }

      setMessages([]);
      setCurrentIndex(0);
      setConfirmBulkDelete(false);

      toast.success("All flagged messages deleted successfully");
    } catch (error) {
      console.error("Error during bulk delete:", error);
      toast.error("Failed to delete all messages");
    } finally {
      setProcessingAction(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Sidebar */}
      <Adminsidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 ml-64">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl font-bold text-gray-800">
              Reported Messages
            </h1>
            <p className="text-gray-600">
              {messages.length > 0
                ? `Showing ${currentIndex + 1} of ${
                    messages.length
                  } reported messages`
                : "No reported messages found"}
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4 w-full md:w-auto">
            <SearchBar />
            <div className="flex items-center space-x-3">
              <NotificationButton />
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center h-64"></div>
        )}

        {/* Empty State */}
        {!isLoading && messages.length === 0 && (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <FiAlertTriangle className="mx-auto text-4xl text-yellow-500 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Reported Messages
            </h3>
            <p className="text-gray-500">
              There are currently no messages that have been reported by users.
            </p>
          </div>
        )}

        {/* Content */}
        {!isLoading && messages.length > 0 && (
          <>
            {/* Message Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6 transition-all duration-300 hover:shadow-lg">
              <Card />
              {messages[currentIndex].produitId && (
                <div className="px-6 pb-4">
                  <a
                    href={`/product/${messages[currentIndex].produitId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                  >
                    <FiExternalLink className="mr-1" />
                    View linked product
                  </a>
                </div>
              )}
            </div>

            {/* Navigation */}
            {messages.length > 1 && (
              <div className="flex justify-between items-center mb-8">
                <button
                  className={`flex items-center px-4 py-2 rounded-md ${
                    processingAction
                      ? "bg-gray-200 text-gray-500"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() =>
                    setCurrentIndex(
                      (prev) => (prev - 1 + messages.length) % messages.length
                    )
                  }
                  disabled={processingAction}
                >
                  <FiChevronLeft className="mr-2" />
                  Previous
                </button>

                <div className="text-sm text-gray-500">
                  Message {currentIndex + 1} of {messages.length}
                </div>

                <button
                  className={`flex items-center px-4 py-2 rounded-md ${
                    processingAction
                      ? "bg-gray-200 text-gray-500"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() =>
                    setCurrentIndex((prev) => (prev + 1) % messages.length)
                  }
                  disabled={processingAction}
                >
                  Next
                  <FiChevronRight className="ml-2" />
                </button>
              </div>
            )}

            {/* Bulk Actions */}
            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
              {confirmBulkDelete ? (
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600">Are you sure?</span>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors flex items-center"
                    onClick={handleBulkDelete}
                    disabled={processingAction}
                  >
                    {processingAction ? (
                      <span className="loader"></span>
                    ) : (
                      <>
                        <FiTrash2 className="mr-2" />
                        Confirm Delete All
                      </>
                    )}
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                    onClick={() => setConfirmBulkDelete(false)}
                    disabled={processingAction}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors flex items-center"
                    onClick={() => setConfirmBulkDelete(true)}
                    disabled={processingAction || messages.length === 0}
                  >
                    <FiTrash2 className="mr-2" />
                    Delete All Flagged
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center"
                    onClick={() =>
                      toast.info("Export functionality coming soon")
                    }
                    disabled={processingAction || messages.length === 0}
                  >
                    <FiDownload className="mr-2" />
                    Export Reports
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReportedMessages;
