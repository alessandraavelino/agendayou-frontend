<template>
  <div class="calendar">
    <q-calendar v-model="selectedDate" :options="calendarOptions" />

    <div class="availability">
      <h2>Available Days</h2>
      <ul>
        <li v-for="day in availableDays" :key="day">{{ day }}</li>
      </ul>
    </div>

    <div class="occupied">
      <h2>Occupied Days</h2>
      <ul>
        <li v-for="day in occupiedDays" :key="day">{{ day }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedDate: null,
      availableDays: [],
      occupiedDays: []
    };
  },
  computed: {
    calendarOptions() {
      return {
        // Set the calendar options if needed
        // For example, you can set the range of selectable dates using 'minDate' and 'maxDate' options
        minDate: new Date(), // Only allow selecting dates starting from today
        maxDate: new Date(new Date().getFullYear() + 1, 11, 31) // Allow selecting dates up to 1 year from today
      };
    }
  },
  mounted() {
    // Mock data for available and occupied days
    this.availableDays = [
      '2023-06-01',
      '2023-06-03',
      '2023-06-05',
      '2023-06-08',
      '2023-06-10'
    ];
    this.occupiedDays = [
      '2023-06-02',
      '2023-06-04',
      '2023-06-09',
      '2023-06-11'
    ];
  }
};
</script>

<style scoped>
.calendar {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.availability,
.occupied {
  margin-top: 20px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 5px;
}
</style>
