import React, { useState, useEffect } from 'react';

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/booking', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-neutral-900/50 p-4 border border-neutral-800">
        <h2 className="text-xl font-heading text-white uppercase tracking-wider">Booking History</h2>
        <button onClick={fetchBookings} className="text-sm text-neutral-400 hover:text-primary transition-colors">Refresh</button>
      </div>

      {loading ? (
        <div className="text-neutral-500 py-8 text-center">Loading bookings...</div>
      ) : bookings.length === 0 ? (
        <div className="text-neutral-500 py-8 text-center border border-dashed border-neutral-800">No bookings found in database.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-800/50 text-neutral-400 text-sm uppercase tracking-widest">
                <th className="p-4 border-b border-neutral-800 font-medium">Date (GMT)</th>
                <th className="p-4 border-b border-neutral-800 font-medium">Client Info</th>
                <th className="p-4 border-b border-neutral-800 font-medium">Offer Booked</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b._id} className="hover:bg-neutral-900/50 transition-colors">
                  <td className="p-4 border-b border-neutral-800 text-sm text-neutral-300 whitespace-nowrap">
                    {new Date(b.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 border-b border-neutral-800">
                    <div className="text-white font-medium">{b.name}</div>
                    <div className="text-neutral-500 text-sm mt-1">{b.phone}</div>
                  </td>
                  <td className="p-4 border-b border-neutral-800">
                    <div className="text-primary font-medium truncate max-w-[200px]">{b.offerTitle}</div>
                    <div className="text-neutral-400 text-sm mt-1 truncate max-w-[250px]">{b.offerDescription}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
