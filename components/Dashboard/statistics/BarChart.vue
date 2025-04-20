<template>
  <UIBox class="min--h-[390px]">
    <UITitle title="Statistics" />
    <div class="w-full h-full bg-white">
      <VueApexCharts type="line" height="300" :options="chartOptions" :series="series" />
    </div>
  </UIBox>
</template>

<script setup lang="ts">
import VueApexCharts from "vue3-apexcharts";
import { ref } from "vue";

const props = defineProps({
  xData: {
    type: Array
  },
  yData: {
    type: Array
  }
})
const series = ref([
  {
    name: "Purchases",
    data: props.yData,
  },
]);
const chartOptions = ref({
  chart: {
    type: "line",
    zoom: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
  },
  stroke: {
    curve: "smooth",
    width: 3,
    colors: ["#FF6F3C"],
  },
  markers: {
    size: 5,
    colors: ["#FFFFFF"],
    strokeColors: "#FF6F3C",
    strokeWidth: 2,
  },
  xaxis: {
    categories: props.xData,
    labels: {
      style: {
        colors: "#7E7E7E",
        fontSize: "14px",
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    labels: {
      formatter: (value: number) => {
        if (value >= 1000) return `$${(value / 1000).toFixed(1)}k`;
        return `$${value}`;
      },
      style: {
        colors: "#7E7E7E",
        fontSize: "14px",
      },
    },
  },
  grid: {
    borderColor: "#ECECEC",
    strokeDashArray: 5,
  },
  tooltip: {
    enabled: true,
    x: {
      format: "dd MMM yyyy",
    },
    y: {
      formatter: (value: number) => `$${value.toLocaleString()}`,
    },
    theme: "dark",
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "light",
      type: "vertical",
      gradientToColors: ["rgba(255, 111, 60, 0.2)"],
      stops: [0, 100],
    },
  },
});



</script>

<style scoped></style>
