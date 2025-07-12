import React, { useState, useEffect, useRef } from "react";
import {
  sendChatMessage,
  getProductRecommendations,
} from "../../services/recommendationService.js";
import Item from "../Item/Item.jsx";
import all_product from "../Assets/all_product";
import "./RecommendationChat.css";

const RecommendationChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const chatEndRef = useRef(null);

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initialize session if needed
  useEffect(() => {
    if (!sessionId) {
      // Generate a random session ID or get from localStorage
      const newSessionId =
        localStorage.getItem("chatSessionId") || `session_${Date.now()}`;
      setSessionId(newSessionId);
      localStorage.setItem("chatSessionId", newSessionId);

      // Add welcome message
      setMessages([
        {
          type: "bot",
          text: "Hello! I'm your personal style advisor. Tell me what you're looking for, and I'll help you find the perfect items for your style and needs.",
        },
      ]);
    }
  }, []);

  // SIMPLIFIED CATEGORY DETECTION - Direct approach
  const detectCategory = (text) => {
    const lowerText = text.toLowerCase();
    
    // Women detection - highest priority
    if (
      lowerText.includes("women") ||
      lowerText.includes("woman") ||
      lowerText.includes("female") ||
      lowerText.includes("ladies") ||
      lowerText.includes("lady") ||
      lowerText.includes("dress") ||
      lowerText.includes("blouse") ||
      lowerText.includes("maxi") ||
      lowerText.includes("shift dress") ||
      lowerText.includes("floral") ||
      lowerText.includes("feminine")
    ) {
      console.log("WOMEN category detected in:", lowerText);
      return "women";
    }
    
    // Men detection
    if (
      lowerText.includes("men") ||
      lowerText.includes("man") ||
      lowerText.includes("male") ||
      lowerText.includes("guy") ||
      lowerText.includes("him")
    ) {
      console.log("MEN category detected in:", lowerText);
      return "men";
    }
    
    // Kid detection
    if (
      lowerText.includes("kid") ||
      lowerText.includes("child") ||
      lowerText.includes("boy") ||
      lowerText.includes("girl")
    ) {
      console.log("KID category detected in:", lowerText);
      return "kid";
    }

    // Default to women if no category is explicitly mentioned
    // This is a fallback for phrases like "suggest a dress"
    if (
      lowerText.includes("dress") ||
      lowerText.includes("blouse") ||
      lowerText.includes("skirt")
    ) {
      console.log("Defaulting to WOMEN category for:", lowerText);
      return "women";
    }

    return null;
  };

  // DIRECT PRODUCT RECOMMENDATION
  const getRecommendations = (userInput, botResponse) => {
    // Combine inputs for analysis
    const combinedText = `${userInput || ""} ${botResponse || ""}`.toLowerCase();
    console.log("Analyzing text:", combinedText);
    
    // STEP 1: Determine the category - this is the most important step
    const category = detectCategory(combinedText);
    console.log("Detected category:", category);
    
    if (!category) {
      console.log("No category detected, cannot provide recommendations");
      return [];
    }
    
    // STEP 2: Filter products by the detected category
    const categoryProducts = all_product.filter(product => 
      product.category === category
    );
    
    console.log(`Found ${categoryProducts.length} products in category ${category}`);
    
    if (categoryProducts.length === 0) {
      console.log("No products found in this category");
      return [];
    }
    
    // STEP 3: Try to match specific keywords in the product names
    const keywords = extractKeywords(combinedText);
    console.log("Extracted keywords:", keywords);
    
    if (keywords.length > 0) {
      // Try to find products matching keywords
      const keywordMatches = categoryProducts.filter(product => {
        const productName = product.name.toLowerCase();
        return keywords.some(keyword => productName.includes(keyword));
      });
      
      console.log(`Found ${keywordMatches.length} products matching keywords`);
      
      // If we found keyword matches, return them
      if (keywordMatches.length > 0) {
        return keywordMatches.slice(0, 8);
      }
    }
    
    // STEP 4: If no specific matches, return a selection from the category
    console.log("Returning general category products");
    return categoryProducts.slice(0, 8);
  };
  
  // Extract meaningful keywords from text
  const extractKeywords = (text) => {
    const keywords = [];
    const lowerText = text.toLowerCase();
    
    // Product types
    if (lowerText.includes("dress")) keywords.push("dress");
    if (lowerText.includes("blouse")) keywords.push("blouse");
    if (lowerText.includes("top")) keywords.push("top");
    if (lowerText.includes("jacket")) keywords.push("jacket");
    if (lowerText.includes("shirt")) keywords.push("shirt");
    
    // Colors
    if (lowerText.includes("pink")) keywords.push("pink");
    if (lowerText.includes("black")) keywords.push("black");
    if (lowerText.includes("white")) keywords.push("white");
    if (lowerText.includes("red")) keywords.push("red");
    if (lowerText.includes("blue")) keywords.push("blue");
    if (lowerText.includes("green")) keywords.push("green");
    
    // Patterns and styles
    if (lowerText.includes("floral")) keywords.push("floral");
    if (lowerText.includes("patterned")) keywords.push("pattern");
    if (lowerText.includes("sparkly")) keywords.push("sparkly");
    if (lowerText.includes("v-neck")) keywords.push("v-neck");
    if (lowerText.includes("square neck")) keywords.push("square neck");
    
    return keywords;
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    // Add user message to chat
    const userMessage = {
      type: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Check if the input directly mentions women's clothing
      const directCategory = detectCategory(input);
      console.log("Direct category from input:", directCategory);

      // Send message to API
      const response = await sendChatMessage(input, sessionId);

      // Add bot response to chat
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: response.response,
        },
      ]);

      // Get recommendations using our simplified approach
      const matchedProducts = getRecommendations(input, response.response);
      
      console.log("Final recommendations:", matchedProducts.map(p => ({
        name: p.name,
        category: p.category
      })));
      
      if (matchedProducts.length > 0) {
        setRecommendations(matchedProducts);
      } else if (directCategory) {
        // Fallback: If we detected a category but found no matches,
        // just show some products from that category
        const categoryProducts = all_product
          .filter(product => product.category === directCategory)
          .slice(0, 8);
          
        console.log("Fallback to category products:", categoryProducts.length);
        
        if (categoryProducts.length > 0) {
          setRecommendations(categoryProducts);
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: "I'm sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recommendation-chat-container">
      <div className="chat-wrapper">
        <h1 className="chat-title">Style Advisor</h1>

        <div className="chat-box">
          {/* Chat messages */}
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-message ${
                  msg.type === "user" ? "user-message" : "bot-message"
                }`}
              >
                <div className="message-bubble">{msg.text}</div>
              </div>
            ))}
            {loading && (
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input form */}
          <form onSubmit={handleSendMessage} className="chat-input-form">
            <div className="input-container">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me about styles, sizes, or for recommendations..."
                className="chat-input"
                disabled={loading}
              />
              <button type="submit" className="send-button" disabled={loading}>
                {loading ? "Sending..." : "Send"}
              </button>
            </div>
          </form>
        </div>

        {/* Product recommendations */}
        {recommendations.length > 0 && (
          <div className="recommendations-section">
            <h2 className="recommendations-title">Recommended Products</h2>
            <div className="recommendations-grid">
              {recommendations.map((product, index) => (
                <Item
                  key={index}
                  id={product.id}
                  name={product.name}
                  image={product.image}
                  price={product.new_price}
                  category={product.category}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendationChat;
