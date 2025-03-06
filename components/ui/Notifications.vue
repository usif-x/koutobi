<template>
  <div class="fixed top-22 left-0 w-full z-50 flex flex-col gap-4">
    <div
        v-for="notification in notifications"
        :key="notification._id"
        class="bg-indigo-600 text-white px-6 py-4 shadow-md mx-4 rounded-lg flex items-center justify-between relative"
    >
      <!-- أيقونة الإغلاق -->
      <button
          class="absolute top-2 left-3 bg-[#1CD4D4] text-black px-2 text-lg font-bold hover:scale-105 hover:shadow-xl transition duration-300 rounded-lg"
          @click="dismissNotification(notification._id)"
      >
        (X)
      </button>

      <!-- محتوى الإشعار -->
      <div class="flex-1 text-center">
        <h4 class="text-lg font-bold underline">{{ notification.title }}</h4>
        <p class="text-md mt-1">{{ notification.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAuth } from "~/composables/useAuth";

const { isAuthenticated } = useAuth();

// تعريف واجهة البيانات
interface Notification {
  _id: string;
  title: string;
  description: string;
  expiryDate: string;
  createdAt: string;
}

// متغير التخزين
const notifications = ref<Notification[]>([]);

// جلب الإشعارات من API

const fetchNotifications = async () => {
  try {
    const response = await $fetch("/api/notifications");
    notifications.value = response.notifications || [];
  } catch (error) {
    console.error("Failed to fetch notifications:", error);
  }
};

// حذف الإشعار عند النقر على ✖
const dismissNotification = (id: string) => {
  notifications.value = notifications.value.filter((n) => n._id !== id);
};

// تحميل الإشعارات عند تشغيل المكون
onMounted(() => {
  if (isAuthenticated.value) {
    fetchNotifications();
  }
});
</script>

<style scoped>
/* إذا كنت تستخدم Tailwind CSS، فلا داعي لتعديلات إضافية */
</style>
