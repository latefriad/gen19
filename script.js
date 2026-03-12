
// Telegram Bot Configuration
const TOKEN = "8638639376:AAEwKYN_97CLQAYUKQ7Zlu7mPjCd7MTXjys";
const CHAT_ID = "2017647912";

document.getElementById("leadForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const submitBtn = document.getElementById("submitBtn");
    const originalText = submitBtn.textContent;
    
    // Get form values
    const name = document.getElementById("name").value;
    const nember = document.getElementById("nember").value;
    const websiteType = document.getElementById("websiteType").value;
    const budget = document.getElementById("budget").value;
    const message = document.getElementById("message").value;

    // Create formatted message for Telegram
    const telegramMessage = `🚀 New Project Lead

👤 Name: ${name}
📱 Number: ${nember}
🌐 Website Type: ${websiteType || "Not specified"}
💰 Budget: ${budget || "Not specified"}
📝 Message: ${message || "No message"}`;

    // Disable button and show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    try {
        console.log("Sending to Telegram...");
        const response = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: telegramMessage
            })
        });

        console.log("Response status:", response.status);
        const data = await response.json();

        console.log("Telegram API Response:", data);

        if (data.ok) {
            alert("Message Sent Successfully! ✅");
            document.getElementById("leadForm").reset();
        } else {
            alert(`Failed: ${data.description}\nError code: ${data.error_code}`);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Network Error: " + error.message + "\nCheck console for details.");
    } finally {
        // Re-enable button
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
});


