import Vue from 'vue'
import ECharts from 'vue-echarts' // import Vue-ECharts component

// Import ECharts modules manually to reduce bundle size
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'

// Register Vue-ECharts component globally
Vue.component('VChart', ECharts)

// If you need to use custom theme or configure ECharts further, you can do it here
// For example:
// Vue.prototype.$echarts = ECharts
// Vue.prototype.$echarts.registerTheme('my-theme', {
//   // Custom theme configuration
// })
