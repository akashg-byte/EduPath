import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { submitContactForm } from '../services/api';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputVal, setInputVal] = useState('');
  
  // State machine for form progression
  // step: 0 (Init), 1 (Name), 2 (Mobile), 3 (Maths), 4 (Physics), 5 (Chemistry), 6 (Done)
  const [step, setStep] = useState(0); 
  const [userData, setUserData] = useState({ name: '', mobile: '', maths: '', physics: '', chemistry: '' });
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addMessage('bot', 'Hi! I am the NaseeeEdu AI Assistant. I can help you find your cutoff and top colleges. What is your name?');
      setStep(1);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (sender, text) => {
    setMessages(prev => [...prev, { sender, text, id: Date.now() }]);
  };

  const handleSend = async () => {
    const val = inputVal.trim();
    if (!val) return;

    addMessage('user', val);
    setInputVal('');

    let currentData = { ...userData };

    if (step === 1) {
      currentData.name = val;
      setUserData(currentData);
      setTimeout(() => {
        addMessage('bot', `Nice to meet you, ${val}. Please provide your 10-digit mobile number so our counselor can reach you with options.`);
        setStep(2);
      }, 500);
    } 
    else if (step === 2) {
      // Basic validation for mobile
      if (!/^\d{10}$/.test(val)) {
        setTimeout(() => addMessage('bot', 'Please enter a valid 10-digit mobile number.'), 500);
        return;
      }
      currentData.mobile = val;
      setUserData(currentData);
      setTimeout(() => {
        addMessage('bot', 'Great! Let\'s calculate your Engineering cutoff. What is your 12th Mathematics mark (out of 100)?');
        setStep(3);
      }, 500);
    }
    else if (step === 3) {
      const mark = parseFloat(val);
      if (isNaN(mark) || mark < 0 || mark > 100) {
        setTimeout(() => addMessage('bot', 'Please enter a valid mark between 0 and 100.'), 500);
        return;
      }
      currentData.maths = mark;
      setUserData(currentData);
      setTimeout(() => {
        addMessage('bot', 'What is your Physics mark (out of 100)?');
        setStep(4);
      }, 500);
    }
    else if (step === 4) {
      const mark = parseFloat(val);
      if (isNaN(mark) || mark < 0 || mark > 100) {
        setTimeout(() => addMessage('bot', 'Please enter a valid mark between 0 and 100.'), 500);
        return;
      }
      currentData.physics = mark;
      setUserData(currentData);
      setTimeout(() => {
        addMessage('bot', 'What is your Chemistry mark (out of 100)?');
        setStep(5);
      }, 500);
    }
    else if (step === 5) {
      const mark = parseFloat(val);
      if (isNaN(mark) || mark < 0 || mark > 100) {
        setTimeout(() => addMessage('bot', 'Please enter a valid mark between 0 and 100.'), 500);
        return;
      }
      currentData.chemistry = mark;
      setUserData(currentData);
      
      const cutoff = currentData.maths + (currentData.physics / 2) + (currentData.chemistry / 2);
      
      setTimeout(() => {
        addMessage('bot', `Calculating your cutoff...`);
        setTimeout(() => {
          addMessage('bot', `Your TNEA Engineering Cutoff is **${cutoff.toFixed(2)} / 200**! Based on this, you are eligible for top colleges.`);
          addMessage('bot', `Our counselor will contact you at ${currentData.mobile} shortly with the best college options. Thanks for chatting!`);
          setStep(6);
          
          // Silently send data to contact API
          submitContactForm({
            name: currentData.name,
            mobile: currentData.mobile,
            email: 'via_chatbot@naseeeedu.com', 
            query: `Chatbot Cutoff Lead - Marks: Math:${currentData.maths}, Phy:${currentData.physics}, Chem:${currentData.chemistry}. Cutoff: ${cutoff}`
          }).catch(console.error);

        }, 1000);
      }, 500);
    }
    else if (step === 6) {
      setTimeout(() => addMessage('bot', 'We have already recorded your details. A counselor will contact you soon. Have a great day!'), 500);
    }
  };

  const wrapBold = (text) => {
    // Simple bold parser for cutoff string
    const parts = text.split('**');
    return parts.map((part, i) => i % 2 !== 0 ? <strong key={i}>{part}</strong> : part);
  };

  return (
    <>
      <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 999 }}>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ ease: "easeOut", duration: 0.3 }}
              style={{
                width: '350px',
                height: '500px',
                background: 'linear-gradient(145deg, #1e293b, #0f172a)',
                border: '1px solid var(--glass-border-light)',
                borderRadius: '1rem',
                boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                marginBottom: '1rem'
              }}
            >
              <div style={{ padding: '1.25rem', background: '#2563eb', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Bot size={24} />
                  <span style={{ fontWeight: '600', fontSize: '1.1rem' }}>NaseeeEdu Assistant</span>
                </div>
                <button onClick={() => setIsOpen(false)} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', padding: '0.25rem' }}>
                  <X size={20} />
                </button>
              </div>

              <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {messages.map((m) => (
                  <motion.div 
                    initial={{ opacity: 0, x: m.sender === 'user' ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={m.id} 
                    style={{ 
                      alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                      background: m.sender === 'user' ? '#2563eb' : 'rgba(255,255,255,0.1)',
                      color: 'white',
                      padding: '0.75rem 1rem',
                      borderRadius: m.sender === 'user' ? '1rem 1rem 0 1rem' : '1rem 1rem 1rem 0',
                      maxWidth: '85%',
                      lineHeight: '1.5',
                      fontSize: '0.95rem'
                    }}
                  >
                    {wrapBold(m.text)}
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div style={{ padding: '1rem', borderTop: '1px solid var(--glass-border)', display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  placeholder={step === 6 ? "Chat finished" : "Type your answer..."}
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  disabled={step === 6}
                  style={{
                    flex: 1,
                    padding: '0.75rem 1rem',
                    borderRadius: '2rem',
                    border: '1px solid var(--glass-border)',
                    background: 'rgba(255,255,255,0.05)',
                    color: 'white',
                    outline: 'none'
                  }}
                />
                <button 
                  onClick={handleSend}
                  disabled={step === 6}
                  style={{ 
                    width: '45px', 
                    height: '45px', 
                    borderRadius: '50%', 
                    background: '#2563eb', 
                    border: 'none', 
                    color: 'white', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    cursor: step === 6 ? 'default' : 'pointer',
                    opacity: step === 6 ? 0.5 : 1
                  }}
                >
                  <Send size={18} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #2563eb, #06b6d4)',
            border: 'none',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(37, 99, 235, 0.4)',
            cursor: 'pointer'
          }}
        >
          {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
        </motion.button>
      </div>
    </>
  );
};

export default Chatbot;
