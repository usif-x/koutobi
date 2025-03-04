<template>
  <div class="notification-wrapper">
    <div
        v-for="notification in notifications"
        :key="notification._id"
        class="notification"
    >
      <div class="notification-content">
        <div class="notification-text">
          <h4>{{ notification.title }}</h4>
          <p>{{ notification.description }}</p>
          <small class="notification-date">
            {{ formatDate(notification.createdAt) }}
          </small>
        </div>
        <button
            class="notification-close"
            @click="dismissNotification(notification._id)"
        >
          ×
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Interface matching the backend response
interface Notification {
  _id: string;
  title: string;
  description: string;
  expiryDate: string;
  createdAt: string;
  __v?: number;
}

// Reactive state for notifications
const notifications = ref<Notification[]>([])

// Fetch notifications from API
const fetchNotifications = async () => {
  try {
    const response = await $fetch('/api/notifications')
    notifications.value = response.notifications || []
  } catch (error) {
    console.error('Failed to fetch notifications:', error)
  }
}

// Dismiss a specific notification
const dismissNotification = (id: string) => {
  notifications.value = notifications.value.filter(n => n._id !== id)
}

// Format date to a more readable format
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Fetch notifications when component is mounted
onMounted(fetchNotifications)
</script>

<style scoped>
.notification-wrapper {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  max-width: 350px;
}

.notification {
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
}

.notification-content {
  display: flex;
  align-items: flex-start;
}

.notification-text {
  flex-grow: 1;
  margin-right: 10px;
}

.notification-text h4 {
  margin: 0 0 5px 0;
  font-weight: bold;
}

.notification-text p {
  margin: 0 0 10px 0;
  color: #666;
}

.notification-date {
  color: #888;
  font-size: 0.8em;
}

.notification-close {
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
  color: #999;
  position: absolute;
  top: 5px;
  right: 10px;
}
</style>