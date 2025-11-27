import React from 'react'
import { MessageSquare } from 'lucide-react'

const PlaceHolder = () => {
  return (
    <div>
      <div className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
              <MessageSquare
                className="w-10 h-10 text-emerald-400"
                strokeWidth={1.5}
              />
            </div>
          </div>
          <h2 className="text-white mb-2">Select a chat to start messaging</h2>
          <p className="text-gray-400">
            Choose a conversation from the sidebar to begin
          </p>
        </div>
    </div>
  )
}

export default PlaceHolder
