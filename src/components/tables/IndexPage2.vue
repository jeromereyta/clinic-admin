<template>
  <q-page-container className="messiah-container">
    <q-page className="column items-center">
      <div className="header row">
        <img src="./messiah.png" alt="messiah" className="messiah-logo" />
        <div className="col-8">
          <h5 className="title">Messiah Clinica Medica Medical Clinic</h5>
          <p className="sub-title">
            2<sup>nd</sup> Floor kimstom Plaza, P.Victor, Cor. P. Burgos
            Guadalupe Nuevo Makati
          </p>
        </div>

        <div className="col">
          <p className="email">e-mail: messiahcmclinic@gmail.com</p>
        </div>
      </div>

      <div className="client-information row">
        <h5 className="title col-7">Client/Patient Information</h5>
        <h5 className="title right col-5">CLIENT TRANSACTION STATEMENT</h5>

        <div className="border">
          <div className="details row">
            <div className="col-7">
              <p className="text">Patient ID#: PX000001</p>
              <p className="text">Patient Name: PELONIA BIENVENIDO., JR.</p>
              <p className="text">Birth date: Dec. 19, 1978</p>
              <p className="text">Transaction ID No: PX0001-060722-2</p>
            </div>
            <div className="col-5">
              <p className="text date">Date: June 7,2022</p>

              <p className="text age">Age/Gender: 43/M</p>

              <p className="text">Payment Mode: Cash</p>

              <p className="text">Queuing #: 04</p>
            </div>
          </div>
        </div>
        <h5 className="title col-7">Billing Summary</h5>
        <q-table
          hide-bottom
          dense
          :rows="rows"
          :columns="columns"
          row-key="number"
        />

        <p className="acknowledgement">
          I/We hereby certify the correctness and the authenticity of entry of
          this document and that necessary Acknowledgement <br />
          Receipt was issues to the patient client for information prior to the
          conduct transaction
        </p>

        <div className="signature row">
          <p className="prepaired col-6">
            Prepaired by: <span> Duty Reception Staff</span>
          </p>
          <p className="client col-6">
            PX/Client Signature: <span> Biendvenido P. Pelonia Jr</span>
          </p>
        </div>

        <div className="logos row">
          <div className="col-3 logo-container">
            <img src="./DOH_Logo.png" alt="doh logo" />
            <p>Lic. #: 13-0433-22-Cl-2</p>
          </div>
          <div className="col-5 logo-container">
            <img src="./FDA-Logo.png" alt="fda logo" />
            <p className="fda">CDRRHR-RRD No. NCR-M <sub>0922218395825</sub></p>
          </div>
          <div className="col-4 logo-container">
            <img src="./phone.png" alt="phone" className="phone" />
            <p className="phone">Smart 0999-1638768 /Globe 09158082664</p>
          </div>
        </div>
      </div>
    </q-page>
  </q-page-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

const columns = [
  {
    number: 'number',
    label: 'No.',
    align: 'center',
    field: 'number',
  },
  {
    desc: 'desc',
    label: 'Description',
    align: 'center',
    field: 'desc',
  },
  { amount: 'amount', label: 'Amount', field: 'amount', align: 'center' },
  {
    number1: 'number1',
    label: 'No.',
    align: 'center',
    field: 'number1',
  },
  {
    desc1: 'desc1',
    label: 'Description',
    align: 'center',
    field: 'desc1',
  },
  { amount1: 'amount1', label: 'Amount', field: 'amount1', align: 'center' },
];

const rows = [
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
];
export default defineComponent({
  name: 'IndexPage',
  components: {},

  setup() {
    return {
      columns,
      rows,
    };
  },
});
</script>

<style lang="scss">
.messiah-container {
  padding-top: 30px;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  .header {
    min-width: 735px;
    margin: 0 0 0 auto;
    .messiah-logo {
      position: absolute;
      height: 50px;
      width: 50px;
      object-fit: contain;
      top: 0;
      left: 0;
    }
    h5.title {
      margin: 0;
      font-size: 1.2rem;
      font-weight: 600;
      color: #ff0083;
    }
    p {
      &.sub-title {
        margin: 0;
        font-size: 0.85rem;
        font-style: italic;
        line-height: 1;
        white-space: nowrap;
      }
      &.email {
        font-size: 0.85rem;
        font-style: italic;
        line-height: 1;
        margin: 35px 0 0 0;
        text-align: right;
      }
    }
  }
  .client-information {
    min-width: 735px;
    h5.title {
      margin: 0.5% 0 0 0;
      font-size: 1.2rem;
      font-weight: 600;
      text-transform: capitalize;
      &.right {
        text-align: right;
      }
    }
    .border {
      border: 2px solid #5f8cc4;
      width: 100%;
      padding: 1%;
    }
    .details {
      width: 100%;
      position: relative;
      .text {
        margin: 0;
        font-size: 1.1rem;
        font-weight: 600;
        padding-left: 20px;
        line-height: 1.2;
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
          font-size: 1rem;
          padding: 0;
        }
      }
      tbody {
        background: transparent !important;
        background-color: transparent !important;
        tr {
          height: auto;
          &:hover {
            background: transparent !important;
            background-color: transparent !important;
            td {
              &::before {
                background: transparent !important;
                background-color: transparent !important;
              }
              border-bottom: 1px solid #000 !important;
              border-right: 1px solid #000 !important;
              background: transparent !important;
              background-color: transparent !important;
              padding: 0;
            }
          }
          td {
            border-bottom: 1px solid #000 !important;
            border-right: 1px solid #000 !important;
            background: transparent !important;
            background-color: transparent !important;
            font-size: 1rem;
            padding: 0;
          }
        }
      }
    }
    .acknowledgement {
      font-size: 0.92rem;
      font-style: italic;
      margin: 10px 0 0 0;
    }
    .signature {
      width: 100%;
      margin-top: 7px;
      .prepaired {
        font-size: 0.92rem;
        display: flex;
        font-style: italic;
        span {
          display: block;
          border-top: 1px solid #000;
          padding: 0 10%;
          margin-top: 4%;
          margin-left: 5%;
          font-style: normal;
        }
      }
      .client {
        font-size: 0.92rem;
        display: flex;
        font-style: italic;
        justify-content: flex-start;
        align-items: flex-start;
        span {
          display: block;
          padding: 0 10%;
          margin-left: 5%;
          font-style: normal;
          border-bottom: 1px solid #000;
          font-weight: 600;
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
