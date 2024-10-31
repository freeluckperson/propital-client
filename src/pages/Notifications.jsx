import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaCheckCircle, FaTrash, FaFilter, FaHome } from "react-icons/fa";

const api_base_url = import.meta.env.VITE_API_BASE_URL;

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      fetchNotifications();
    } else {
      setIsLoading(false);
    }
  }, [userId]);

  const fetchNotifications = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${api_base_url}/my-notifications?userId=${userId}`
      );
      setNotifications(response.data.notifications || []);
      setFilteredNotifications(response.data.notifications || []);
    } catch (error) {
      console.error("Error al obtener notificaciones:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilter = (filterType) => {
    setFilter(filterType);
    const now = new Date();
    let filtered = [...notifications];

    if (filterType === "this_week") {
      const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
      filtered = notifications.filter(
        (notification) => new Date(notification.date) >= startOfWeek
      );
    } else if (filterType === "today") {
      const today = new Date(now.setHours(0, 0, 0, 0));
      filtered = notifications.filter(
        (notification) => new Date(notification.date) >= today
      );
    }

    setFilteredNotifications(filtered);
  };

  const handleMarkAsRead = async (id) => {
    try {
      await axios.put(`${api_base_url}/notifications/read`, {
        notificationIds: [id],
        userId: userId,
      });

      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification._id === id
            ? { ...notification, read: true }
            : notification
        )
      );
      applyFilter(filter);
    } catch (error) {
      console.error("Error al marcar como leído:", error);
    }
  };

  const handleDeleteNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification._id !== id)
    );
    applyFilter(filter);
  };

  const handleFilterChange = (newFilter) => {
    applyFilter(newFilter);
  };

  const handleGoHome = () => navigate("/");

  return (
    <div className="max-w-lg mx-auto p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Notificaciones</h1>
        <button
          onClick={handleGoHome}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
        >
          <FaHome /> Inicio
        </button>
      </header>

      <div className="flex gap-4 mb-4">
        <button
          onClick={() => handleFilterChange("all")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition ${
            filter === "all" ? "bg-gray-200 font-semibold" : ""
          }`}
        >
          <FaFilter /> Todas
        </button>
        <button
          onClick={() => handleFilterChange("this_week")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition ${
            filter === "this_week" ? "bg-gray-200 font-semibold" : ""
          }`}
        >
          <FaFilter /> Esta semana
        </button>
        <button
          onClick={() => handleFilterChange("today")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition ${
            filter === "today" ? "bg-gray-200 font-semibold" : ""
          }`}
        >
          <FaFilter /> Hoy
        </button>
      </div>

      {isLoading ? (
        <p className="text-center text-gray-500">Cargando notificaciones...</p>
      ) : (
        <ul className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <p className="text-center text-gray-500">
              No tienes notificaciones.
            </p>
          ) : (
            filteredNotifications.map((notification) => (
              <li
                key={notification._id}
                className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center"
              >
                <p>{notification.message}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleMarkAsRead(notification._id)}
                    className={`${
                      notification.read ? "text-gray-500" : "text-green-600"
                    } hover:text-green-800 transition`}
                    title="Marcar como leída"
                    disabled={notification.read}
                  >
                    <FaCheckCircle />
                  </button>
                  <button
                    onClick={() => handleDeleteNotification(notification._id)}
                    className="text-red-600 hover:text-red-800 transition"
                    title="Eliminar"
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
