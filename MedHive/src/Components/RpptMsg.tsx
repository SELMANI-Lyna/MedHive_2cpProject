import React, { useState, useEffect } from 'react';

interface ReportedMessage {
  _id: string;
  contenu: string;
  author: string;
  contact: string;
  location: string;
  productName: string;
  price: number;
  description: string;
  produitId?: string;
  notificationId: string;
}

interface DolipraneAdProps {
  productName: string;
  price: string | number;
  description: string;
  contact: string;
  location: string;
  author: string;
  onDelete: () => void;
  onIgnore: () => void;
}

function Card({
  productName,
  price,
  description,
  contact,
  location,
  author,
  onDelete,
  onIgnore,
}: DolipraneAdProps) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '20px',
      backgroundColor: '#f5f5f5',
      marginRight: "-1000px",
    }}>
      <div style={{
        maxWidth: '600px',
        width: '100%',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #eee' }}>
          <h2 style={{ margin: '0 0 10px 0', fontSize: '24px', color: '#333' }}>{productName}</h2>
          <p style={{ margin: '10px 0', fontSize: '16px', color: '#555' }}>{description}</p>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '15px',
          }}>
            <div>
              <p><strong>Contact:</strong> {contact}</p>
              <p><strong>Location:</strong> {location}</p>
              <p><strong>Reported by:</strong> {author}</p>
            </div>
            <div style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#4A5568',
            }}>
              {typeof price === 'string' && price.trim() === '' ? 'N/A' : `${price} €`}
            </div>
          </div>
        </div>
        <div style={{ padding: '20px' }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <button
              style={{
                backgroundColor: "#F56565", color: "white",
                padding: "10px 20px", border: "none",
                borderRadius: "5px", cursor: "pointer"
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#C53030")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#F56565")}
              onClick={onDelete}
            >
              Delete Post
            </button>
            <button
              style={{
                backgroundColor: "#48BB78", color: "white",
                padding: "10px 20px", border: "none",
                borderRadius: "5px", cursor: "pointer"
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#2F855A")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#48BB78")}
              onClick={onIgnore}
            >
              Ignore Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const ReportedMessagesManager: React.FC = () => {
  const [messages, setMessages] = useState<ReportedMessage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [processingAction, setProcessingAction] = useState(false);

  useEffect(() => {
    const fetchReportedMessages = async () => {
      try {
        const res = await fetch('/api/utilisateur/gestionAdmin/obtenirNotifications', {
          credentials: 'include',
        });
        const data = await res.json();
        const reportedMessages = data
          .filter((notif: any) => notif.type === 'signalement_message' && notif.message)
          .map((notif: any) => ({
            _id: notif.message._id,
            contenu: notif.message.contenu,
            author: notif.signalePar?.username || 'Anonymous',
            contact: notif.signalePar?.email || 'No contact',
            location: 'Unknown',
            productName: notif.message.produitNom || 'Reported Message',
            price: notif.message.produitPrix || 0,
            description: notif.message.contenu,
            produitId: notif.message.produitId,
            notificationId: notif._id,
          }));

        setMessages(reportedMessages);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching reported messages:", err);
        setIsLoading(false);
      }
    };

    fetchReportedMessages();
  }, []);

  const handleDelete = async () => {
    if (processingAction) return;
    setProcessingAction(true);
    const currentMessage = messages[currentIndex];

    try {
      await fetch(`/api/utilisateur/gestionAdmin/traiterSignalement/${currentMessage.notificationId}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'approuver' })
      });

      if (currentMessage.produitId) {
        try {
          await fetch(`/api/produits/${currentMessage.produitId}`, {
            method: 'DELETE',
            credentials: 'include'
          });
        } catch (err) {
          console.error("Failed to delete product:", err);
        }
      }

      const updated = messages.filter((_, i) => i !== currentIndex);
      setMessages(updated);
      setCurrentIndex(prev => updated.length === 0 ? 0 : Math.min(prev, updated.length - 1));

    } catch (err) {
      console.error("Error processing delete:", err);
    } finally {
      setProcessingAction(false);
    }
  };

  const handleIgnore = async () => {
    if (processingAction) return;
    setProcessingAction(true);

    try {
      await fetch(`/api/utilisateur/gestionAdmin/traiterSignalement/${messages[currentIndex].notificationId}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'refuser' })
      });

      const updated = messages.filter((_, i) => i !== currentIndex);
      setMessages(updated);
      setCurrentIndex(prev => updated.length === 0 ? 0 : Math.min(prev, updated.length - 1));

    } catch (err) {
      console.error("Error ignoring report:", err);
    } finally {
      setProcessingAction(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (messages.length === 0) return <div>No reported messages found</div>;

  const currentMessage = messages[currentIndex];

  return (
    <div>
      <Card
        productName={currentMessage.productName}
        price={currentMessage.price}
        description={currentMessage.description}
        contact={currentMessage.contact}
        location={currentMessage.location}
        author={currentMessage.author}
        onDelete={handleDelete}
        onIgnore={handleIgnore}
      />
      <div style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '20px'
      }}>
        <button onClick={() => setCurrentIndex(prev => (prev - 1 + messages.length) % messages.length)}>Previous</button>
        <span>{currentIndex + 1}/{messages.length}</span>
        <button onClick={() => setCurrentIndex(prev => (prev + 1) % messages.length)}>Next</button>
      </div>
    </div>
  );
};

export default ReportedMessagesManager;
