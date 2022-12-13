<template>
  <q-page-container class="messiah-container">
    <q-page class="column items-center">
      <div class="header row">
        <img src="./messiah.png" alt="messiah" class="messiah-logo" />
        <div class="col-8">
          <h5 class="title">Messiah Clinica Medica Medical Clinic</h5>
          <p class="sub-title">
            2<sup>nd</sup> Floor kimstom Plaza, P.Victor, Cor. P. Burgos
            Guadalupe Nuevo Makati
          </p>
        </div>

        <div class="col">
          <p class="email">e-mail: messiahcmclinic@gmail.com</p>
        </div>
      </div>

      <div class="client-information row">
        <h5 class="title col-7">Patient Information</h5>
        <h5 class="title right col-5">Patient Transaction Statement</h5>

        <div class="border">
          <div class="details row">
            <div class="col-7">
              <p class="text">Patient ID#: {{patientData.patient_code}}</p>
              <p class="text">Patient Name: {{patientData.patient_name}}</p>
              <p class="text">Birth date: {{patientData.patient_birth_date}}</p>
              <p class="text">Transaction ID No: {{patientData.total_summary.transaction_code}}</p>
            </div>
            <div class="col-5">
              <p class="text date">Date: {{patientData.total_summary.created_at}}</p>

              <p class="text age">Age/Gender: {{patientData.patient_age}}/{{patientData.patient_gender}}</p>

              <p class="text">Payment Mode: {{patientData.total_summary.payment_method}}</p>
            </div>
          </div>
        </div>
        <h5 class="title col-7">Billing Summary</h5>
        <q-table
          hide-bottom
          dense
          :data="procedures"
          :columns="columns"
          row-key="number"
        />

        <div class="border-black">
          <div class="details row">
            <div class="col-6"></div>
            <div class="col-4">
              <p class="text">Total balance due #: </p>
            </div>
            <div class="col-4">
              <p class="text date"> <span>&#8369;
                        {{patientData.total_summary.total_amount}}
                      </span></p>
            </div>
          </div>
        </div>
        <p class="acknowledgement">
          I/We hereby certify the correctness and the authenticity of entry of
          this document and that necessary Acknowledgement <br />
          Receipt was issues to the patient client for information prior to the
          conduct transaction
        </p>

        <div class="signature row">
          <p class="prepared col-6">
            prepared by: <span> Duty Reception Staff</span>
          </p>
          <p class="client col-6">
            PX/Client Signature: <span> {{patientData.patient_name}}</span>
          </p>
        </div>

        <div class="logos row">
          <div class="col-3 logo-container">
            <img src="./DOH_Logo.png" alt="doh logo" />
            <p>Lic. #: 13-0433-22-Cl-2</p>
          </div>
          <div class="col-5 logo-container">
            <img src="./FDA-Logo.png" alt="fda logo" />
            <p class="fda">CDRRHR-RRD No. NCR-M <sub>0922218395825</sub></p>
          </div>
          <div class="col-4 logo-container">
            <img src="./phone.png" alt="phone" class="phone" />
            <p class="phone">Smart 0999-1638768 /Globe 09158082664</p>
          </div>
        </div>
      </div>
    </q-page>
  </q-page-container>
</template>

<script>
export default {
  name: 'IndexPage',
  props: [
    'transactions',
    'patientData',
  ],
  computed : {
    procedures: function () {
      let counter = 1;
      return this.patientData.procedures.map(procedure => {
        procedure.index = counter;
        counter++;

        return procedure;
      });
    },
  },
  data () {
    return {
      columns : [
        {
          number: 'number',
          label: 'No.',
          align: 'center',
          field: 'index',
        },
        {
          desc: 'desc',
          label: 'Description',
          align: 'center',
          field: 'name',
        },
        {
          number1: 'number1',
          label: 'Queue No.',
          align: 'center',
          field: 'queue_number',
        },
        { amount: 'amount', label: 'Amount', field: 'price', align: 'center' },
      ],
      rows : [
        {
          number: '1',
          desc: 'CBC',
          amount: '350.00',
          number1: '6',
          desc1: 'Pelvic Ultrasound',
          amount1: '350.00',
        },
        {
          number: '2',
          desc: 'Urinalysis',
          amount: '85.00',
          number1: '7',
          desc1: 'Hepa-B testing',
          amount1: '1,100.00',
        },
        {
          number: '3',
          desc: 'Abdominal Ultrasound',
          amount: '1,200.00',
          number1: '8',
          desc1: '',
          amount1: '',
        },
        {
          number: '4',
          desc: 'Fecalysis',
          amount: '100.00',
          number1: '9',
          desc1: '',
          amount1: '',
        },
        {
          number: '5',
          desc: 'Blood typing',
          amount: '300.00',
          number1: '10',
          desc1: '',
          amount1: '',
        },
      ],
    }
  },
};
</script>

<style lang="scss">
.messiah-container {
  margin-left: -250px;
  max-width: 700px;
  position: relative;
  .header {
    margin-top: -55px!important;
    min-width: 735px;
    .messiah-logo {
      margin-top: -55px!important;
      position: absolute;
      height: 40px;
      width: 40px;
      margin-left: -49px;
      object-fit: contain;
      top: 0;
      left: 0;
    }
    h5.title {
      margin: 0;
      font-size: 0.75rem;
      font-weight: 400;
      color: #ff0083;
    }
    p {
      &.sub-title {
        margin: 0;
        font-size: 0.75rem;
        font-style: italic;
        line-height: 1;
        white-space: nowrap;
      }
      &.email {
        font-size: 0.75rem;
        font-style: italic;
        line-height: 1;
        margin: 28px 0 0 0;
        text-align: right;
      }
    }
  }
  .client-information {
    min-width: 735px;
    h5.title {
      margin: 0.5% 0 0 0;
      font-size: 0.75rem;
      font-weight: 400;
      text-transform: capitalize;
      &.right {
        text-align: right;
      }
    }
    .border {
      border: 1px solid #5f8cc4;
      width: 100%;
      padding: 1%;
    }
    .border-black {
      border: 1px solid black;
      width: 100%;
      padding: 1%;
    }
    .details {
      width: 100%;
      position: relative;
      .text {
        margin: 0;
        font-size: 0.75rem;
        font-weight: 400;
        padding-left: 10px;
        line-height: 1.0;
        &.date {
          position: absolute;
          top: 0;
          right: 20px;
        }
        &.age {
          margin: 7% 0 0 0;
        }
      }
      .col-5 {
        .text {
          // padding-left: 18%;
        }
      }
    }
    .q-table__container {
      box-shadow: none !important;
      width: 100%;
      border-left: 1px solid #000 !important;
      border-radius: 0;
      thead {
        th {
          border-bottom: 1px solid #000 !important;
          border-right: 1px solid #000 !important;
          border-top: 1px solid #000 !important;
          font-size: 0.75rem;
          padding: 0;
        }
      }
      tbody {
        background: transparent !important;

        tr {
          height: auto;
          &:hover {
            background: transparent !important;

            td {
              &::before {
                background: transparent !important;
              }
              border-bottom: 1px solid #000 !important;
              border-right: 1px solid #000 !important;
              background: transparent !important;
              padding: 0;
            }
          }
          td {
            border-bottom: 1px solid #000 !important;
            border-right: 1px solid #000 !important;
            background: transparent !important;
            font-size: 0.75rem;
            padding: 0;
          }
        }
      }
    }
    .acknowledgement {
      font-size: 0.65rem;
      font-style: italic;
      margin: 10px 0 0 0;
    }
    .signature {
      width: 100%;
      margin-top: 4px;
      .prepared {
        font-size: 0.65rem;
        display: flex;
        font-style: italic;
        span {
          display: block;
          border-top: 1px solid #000;
          padding: 0 4%;
          margin-top: 2%;
          margin-left: 3%;
          font-style: normal;
        }
      }
      .client {
        font-size: 0.75rem;
        display: flex;
        font-style: italic;
        justify-content: flex-start;
        align-items: flex-start;
        span {
          display: block;
          padding: 0 7%;
          margin-left: 5%;
          font-style: normal;
          border-bottom: 1px solid #000;
          font-weight: 400;
        }
      }
    }
    .logos {
      width: 100%;
      border-top: 2px solid #000;
      padding-top: 10px;
      .logo-container {
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          height: 50px;
          width: 50px;
          &.phone {
            height: 40px;
            width: 40px;
          }
        }
        p {
          margin: 0 0 0 5px;
          font-weight: 600;
          font-size: 0.8rem;
          &.fda {
            white-space: nowrap;
            display: flex;
            justify-content: center;
            align-items: center;
            sub {
              margin-left: 5px;
            }
          }
          &.phone {
            font-size: 0.7rem;
          }
        }
      }
    }
  }
}
</style>
