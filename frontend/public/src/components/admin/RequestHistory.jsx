import React from "react";
import { formatDateTime } from "../../utils/formatters";
import { getStatusData } from "../../utils/mockData";

const RequestHistory = ({ history = [] }) => {
  if (history.length === 0) {
    return (
      <div className="py-4 text-center text-gray-500">
        No hay eventos de historial para este trámite.
      </div>
    );
  }

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {history.map((event, eventIdx) => {
          const status = getStatusData(event.status);

          return (
            <li key={eventIdx}>
              <div className="relative pb-8">
                {eventIdx !== history.length - 1 ? (
                  <span
                    className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  ></span>
                ) : null}
                <div className="relative flex items-start space-x-3">
                  {/* Status circle */}
                  <div>
                    <div
                      className={`relative px-1 ${status.color} h-10 w-10 rounded-full flex items-center justify-center`}
                    >
                      <span className="h-2.5 w-2.5 rounded-full bg-white"></span>
                    </div>
                  </div>

                  {/* Event content */}
                  <div className="min-w-0 flex-1">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        Estado: {status.label}
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        {formatDateTime(event.date)}
                      </p>
                    </div>
                    {event.comment && (
                      <div className="mt-2 text-sm text-gray-700">
                        <p>{event.comment}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RequestHistory;
