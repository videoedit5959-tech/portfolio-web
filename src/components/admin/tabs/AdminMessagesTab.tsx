import React, { useState } from 'react';
import { ContactMessageData } from '../../../types/portfolio';
import { Mail, Trash2, CheckCircle2, Circle, Clock, Reply, User, Calendar, AlertCircle } from 'lucide-react';

interface AdminMessagesTabProps {
  messages: ContactMessageData[];
  onMarkRead: (id: string) => void;
  onDeleteMessage: (id: string) => void;
}

export const AdminMessagesTab: React.FC<AdminMessagesTabProps> = ({
  messages,
  onMarkRead,
  onDeleteMessage,
}) => {
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessageData | null>(
    messages[0] || null
  );

  const filtered = messages.filter((m) => {
    if (filter === 'unread') return !m.isRead;
    if (filter === 'read') return m.isRead;
    return true;
  });

  const handleSelectMessage = (msg: ContactMessageData) => {
    setSelectedMessage(msg);
    if (!msg.isRead) {
      onMarkRead(msg.id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
            Inquiries & Contact Messages
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Messages dispatched through the public portfolio contact form with anti-spam metadata.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-xs">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
              filter === 'all'
                ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs'
                : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            All ({messages.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
              filter === 'unread'
                ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs'
                : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            Unread ({messages.filter((m) => !m.isRead).length})
          </button>
          <button
            onClick={() => setFilter('read')}
            className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
              filter === 'read'
                ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs'
                : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            Read
          </button>
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-400 text-xs font-mono">
          No contact messages received yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[480px]">
          {/* Messages List Column */}
          <div className="lg:col-span-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden divide-y divide-zinc-100 dark:divide-zinc-800/80 shadow-xs max-h-[600px] overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="p-8 text-center text-xs text-zinc-400">
                No messages match the current filter.
              </div>
            ) : (
              filtered.map((msg) => {
                const isSelected = selectedMessage?.id === msg.id;
                return (
                  <div
                    key={msg.id}
                    onClick={() => handleSelectMessage(msg)}
                    className={`p-4 cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-cyan-50/70 dark:bg-cyan-950/30'
                        : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        {!msg.isRead ? (
                          <div className="w-2 h-2 rounded-full bg-cyan-500 shrink-0" />
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-transparent shrink-0" />
                        )}
                        <h4
                          className={`text-sm ${
                            !msg.isRead
                              ? 'font-extrabold text-zinc-900 dark:text-white'
                              : 'font-semibold text-zinc-700 dark:text-zinc-300'
                          }`}
                        >
                          {msg.name}
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-400 shrink-0">
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <p className="text-xs font-medium text-zinc-800 dark:text-zinc-200 truncate pl-4">
                      {msg.subject}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1 italic pl-4">
                      "{msg.message}"
                    </p>
                  </div>
                );
              })
            )}
          </div>

          {/* Selected Message Detail Column */}
          <div className="lg:col-span-7 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 flex flex-col justify-between shadow-xs">
            {selectedMessage ? (
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-zinc-100 dark:border-zinc-800">
                  <div>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                      {selectedMessage.subject}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                      <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                        From: {selectedMessage.name}
                      </span>
                      <span>•</span>
                      <a
                        href={`mailto:${selectedMessage.email}`}
                        className="text-cyan-600 dark:text-cyan-400 underline font-mono"
                      >
                        {selectedMessage.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => {
                        onDeleteMessage(selectedMessage.id);
                        setSelectedMessage(null);
                      }}
                      className="p-2 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
                      title="Delete message"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Metadata & Date */}
                <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(selectedMessage.createdAt).toLocaleString()}
                  </span>
                  {selectedMessage.ipAddress && (
                    <span>Origin: {selectedMessage.ipAddress}</span>
                  )}
                </div>

                {/* Full Message Body */}
                <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800">
                  <p className="text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed whitespace-pre-line font-sans">
                    {selectedMessage.message}
                  </p>
                </div>

                {/* Direct Action Reply */}
                <div className="flex items-center gap-3 pt-2">
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(
                      selectedMessage.subject
                    )}`}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 text-xs font-bold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors shadow-xs"
                  >
                    <Reply className="w-4 h-4" />
                    <span>Reply via Direct Email Client</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-zinc-400 font-mono">
                Select a message from the left to read its full content.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
