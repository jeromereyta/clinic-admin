<template>
  <q-page class="q-pa-sm">

    <table-transactions></table-transactions>
    <div class="row q-col-gutter-sm  q-py-sm">
      <!--      <tab-social />-->
      <card-with-image />
      <card-with-image2/>
    </div>


    <div class="row q-col-gutter-sm  q-pb-sm">
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  components: {
    CardSocial: () =>  import('components/cards/CardSocial'),
    CardCharts: () =>  import('components/cards/CardCharts'),
    TabSocial: () =>  import('components/tabs/TabSocial'),
    TableTransactions: () =>  import('components/tables/TableTransactions'),
    CardWithImage: () =>  import('components/cards/CardWithImage'),
    CardWithImage2: () =>  import('components/cards/CardWithImage2'),
    CardTimeLine: () =>  import('components/cards/CardTimeLine'),
    TodoList: () =>  import('components/list/TodoList'),
    TableVisits: () =>  import('components/tables/TableVisits'),
  },
  data() {
    return {
    }
  },
}
</script>
