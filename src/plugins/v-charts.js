import Vue from 'vue';
import 'v-charts/lib/style.css'
import VeLine from 'v-charts/lib/line.common'
import VeHistogram from 'v-charts/lib/histogram.common'
import VeLiquidfil from 'v-charts/lib/liquidfill.common'
Vue.component(VeLine.name, VeLine)
Vue.component(VeHistogram.name, VeHistogram)
Vue.component(VeLiquidfil.name, VeLiquidfil)