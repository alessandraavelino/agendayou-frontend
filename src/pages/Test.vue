<template>
  <q-calendar v-model="selectedDate" :events="events" :options="calendarOptions" />
</template>

<script>
export default {
  data() {
    return {
      selectedDate: new Date(),
      events: [
        {
          start: new Date(2023, 4, 10, 8, 0),
          end: new Date(2023, 4, 10, 9, 0),
          summary: 'Horário ocupado',
        },
        {
          start: new Date(2023, 4, 10, 11, 0),
          end: new Date(2023, 4, 10, 12, 0),
          summary: 'Horário ocupado',
        },
      ],
      calendarOptions: {
        availableTime: ({ date }) => {
          const availableTimes = ['09:00', '10:00', '13:00', '14:00', '15:00'];
          const time = `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
          if (!availableTimes.includes(time)) {
            return false;
          }
          const eventStart = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), 0, 0);
          const eventEnd = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours() + 1, 0, 0);
          const hasConflict = this.events.some(
            event =>
              event.start <= eventStart && event.end > eventStart ||
              event.start >= eventStart && event.start < eventEnd
          );
          return !hasConflict;
        },
      },
    };
  },
};
</script>
