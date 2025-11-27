import React, { useRef, useState } from 'react'
import { useChatStore } from '../store/useChatStore';
import { ImageIcon, XIcon, SendIcon } from 'lucide-react';
import { toast } from 'react-hot-toast';
function MessageInput() {
  const [text,setText]  = useState("");
  const [imagePreview,setImagePreview] = useState(null);
  const fileInputRef = useRef(null)

  const {sendMessage} = useChatStore()
  const handleSendMessage = async (e) =>{
    e.preventDefault();
    if(!text.trim() && !imagePreview) return;
    sendMessage({text: text.trim(), image: imagePreview});
    setText("");
    setImagePreview(null);
    fileInputRef.current.value = null;
  }
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    fileInputRef.current.value = null;
  }
  return (
     <div className="p-4 border-t border-white/10 bg-[#1a1a1a]">
      {imagePreview && (
        <div className="max-w-3xl mx-auto mb-3 flex items-center">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-slate-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-slate-200 hover:bg-slate-700"
              type="button"
            >
              <XIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto flex items-center gap-3">
        <input
          type="text" 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          className='flex-1 bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors' 
          placeholder='Type your message here...'
        />

          <input type='file' accept='image/*' ref={fileInputRef} onChange={handleImageChange} className='hidden'/>
          <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={`bg-[#1a1a1a] border border-white/10 text-gray-400 hover:text-emerald-400 rounded-lg p-3 transition-colors ${
            imagePreview ? "text-emerald-500" : ""
          }`}
        >
          <ImageIcon className="w-5 h-5" />
        </button>
        <button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          className="bg-gradient-to-r from-emerald-500 to-teal-500 text-black rounded-lg p-3 font-medium hover:from-emerald-600 hover:to-teal-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <SendIcon className="w-5 h-5" />
        </button>
          </form>
    </div>
  )
}

export default MessageInput
