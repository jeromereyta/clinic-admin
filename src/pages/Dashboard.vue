<template>
  <q-page class="q-pa-sm">


    <card-charts />


    <table-patient-visits/>

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
        TablePatientVisits: () =>  import('components/tables/TablePatientVisits'),
        CardWithImage: () =>  import('components/cards/CardWithImage'),
        CardWithImage2: () =>  import('components/cards/CardWithImage2'),
        CardTimeLine: () =>  import('components/cards/CardTimeLine'),
        TodoList: () =>  import('components/list/TodoList'),
        TableVisits: () =>  import('components/tables/TableVisits'),
    },
    data() {
      return {
      mode: 'list',
      messages: [
        {
            id: 5,
            name: 'Andrie Caday',
            msg: ' -- I\'ll be in your neighborhood doing errands this\n' +
                '            weekend. Do you want to grab brunch?',
            avatar: 'https://avatars2.githubusercontent.com/u/34883558?s=400&v=4',
            time: '10:42 PM'
        }, {
            id: 6,
            name: 'Jerome Reyta',
            msg: ' -- I\'ll be in your neighborhood doing errands this\n' +
                '            weekend. Do you want to grab brunch?',
            avatar: 'https://cdn.quasar.dev/img/avatar6.jpg',
            time: '11:17 AM'
        }, {
            id: 1,
            name: 'Boy',
            msg: ' -- I\'ll be in your neighborhood doing errands this\n' +
                '            weekend. Do you want to grab brunch?',
            avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
            time: '5:17 AM'
        }, {
            id: 2,
            name: 'Jeff Galbraith',
            msg: ' -- I\'ll be in your neighborhood doing errands this\n' +
                '            weekend. Do you want to grab brunch?',
            avatar: 'https://cdn.quasar.dev/team/jeff_galbraith.jpg',
            time: '5:17 AM'
        }
      ],
    }
  },
}
</script>
