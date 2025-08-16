import React, { useEffect, useState } from "react";

const NotificationManager: React.FC = () => {
  const [enabled, setEnabled] = useState(false);

  // Load saved preference from localStorage
  useEffect(() => {
    const savedPref = localStorage.getItem("notificationsEnabled");
    if (savedPref === "true") {
      setEnabled(true);
    }

    // Check if notifications are already granted
    if (typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission === "granted") {
        if (savedPref === "true") {
          setEnabled(true);
        }
      }
    }
  }, []);

  // Simple toast fallback
  const showToast = (message: string, bgColor: string) => {
    const toast = document.createElement("div");
    toast.innerText = message;
    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.left = "50%";
    toast.style.transform = "translateX(-50%)";
    toast.style.backgroundColor = bgColor;
    toast.style.color = "white";
    toast.style.padding = "10px 20px";
    toast.style.borderRadius = "8px";
    toast.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
    toast.style.zIndex = "9999";
    toast.style.fontSize = "16px";
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  };

  // Ask for permission and save preference
  const requestPermission = () => {
    if ("Notification" in window) {
      if (!enabled) {
        // Trying to enable
        Notification.requestPermission().then((perm) => {
          if (perm === "granted") {
            setEnabled(true);
            localStorage.setItem("notificationsEnabled", "true");
            console.log("✅ Notifications enabled");
          } else {
            setEnabled(false);
            localStorage.setItem("notificationsEnabled", "false");
            console.log("❌ Notifications denied");
          }
        });
      } else {
        // Disabling notifications
        setEnabled(false);
        localStorage.setItem("notificationsEnabled", "false");
        console.log("🔕 Notifications disabled");
      }
    } else {
      console.log("⚠ Notifications API not supported");
    }
  };

  // Send notification or fallback toast
  const sendNotification = (title: string, body: string, color: string) => {
    if (
      enabled &&
      "Notification" in window &&
      Notification.permission === "granted"
    ) {
      new Notification(title, {
        body,
        icon: "/logo.png", // your logo in /public
      });
      console.log(`Notification sent: ${title}`);
    } else {
      showToast(`${title}: ${body}`, color);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "15px" }}>
      {/* Enable notifications checkbox */}
      <label
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          background: "#f1f1f1",
          padding: "6px 12px",
          borderRadius: "6px",
          fontWeight: "bold",
          color: "#222",
          marginBottom: "12px",
          cursor: "pointer",
        }}
      >
        <input
          type="checkbox"
          checked={enabled}
          onChange={requestPermission}
          style={{ transform: "scale(1.2)", cursor: "pointer" }}
        />
        Enable Notifications
      </label>

      {/* Action buttons */}
      <div style={{ marginTop: "10px" }}>
        <button
          onClick={() =>
            sendNotification("Application Update", "🎉 You are hired!", "green")
          }
          style={{
            backgroundColor: "green",
            color: "white",
            padding: "10px 16px",
            borderRadius: "6px",
            marginRight: "10px",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Simulate Hired
        </button>

        <button
          onClick={() =>
            sendNotification(
              "Application Update",
              "⚠ You were rejected.",
              "blue"
            )
          }
          style={{
            backgroundColor: "blue",
            color: "white",
            padding: "10px 16px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Simulate Rejected
        </button>
      </div>
    </div>
  );
};

export default NotificationManager;
