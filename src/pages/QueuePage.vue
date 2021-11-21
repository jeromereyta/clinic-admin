<template>
  <q-page class="q-pa-sm">
    <div class="row q-col-gutter-sm  q-py-sm">

<!--      <card-queue image_src="https://cdn.dribbble.com/users/992639/screenshots/5427980/media/fedff402ce42820dc07550485ea2b493.gif"></card-queue>-->
    </div>
    <card-profile></card-profile>
      <table-queue/>
  </q-page>
</template>

<script>
export default {
  name: 'QueuePage',
  components: {
    CardQueue: () =>  import('components/cards/CardQueue'),
    CardProfile: () =>  import('components/cards/CardProfile'),

    TableQueue: () =>  import('components/tables/TableQueue'),
  },
  data() {
    return {
    }
  },
}
</script>
