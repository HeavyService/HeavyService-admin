<template>
    <div class="modal-overlay" >
      <div class="modal">
        <div class="card">
        <h6>{{ $t('create') }}</h6>
        <form @submit.prevent="handleSubmit" class="form">
          <!-- ... other input fields ... -->
          <label for="instrumentId" class="label">Instrument Id</label>
          <input v-model="formData.instrumentId" type="text" id="instrumentId" class="input" required>

          <label for="comment" class="label">Comment</label>
          <input v-model="formData.comment" type="text" id="comment" class="input" required>
          
          <div class="button-container">
            <button type="submit" class="button create-button">{{ $t('create') }}</button>
            <button type="button" @click="closeModal" class="button cancel-button">{{ $t('cancel') }}</button>
          </div>
        </form>
      </div>
      </div>
    </div>
</template>
  
  
  <script lang="ts">
 import axios from '@/plugins/axios';
 import { InstrumentCommentCreateDto } from '../../../dtos/comments/instrumentcomments/instrumentcomments'; // Adjust the import path
 import { useI18n } from 'vue-i18n';
 import { InstrumentCommentViewModel } from '@/viewmodels/InstrumentCommentViewModel';

export default {
  name: 'InstrumentCommentCreateDto',
  data() {
    return {
        formData: new InstrumentCommentCreateDto(1, ' ', true),
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    
    async handleSubmit() {
      try {
        console.log(this.formData);
        
        const response = await axios.post('/api/instruments/comments', this.formData);
        this.closeModal();
        alert('Item created successfully!');
        // Handle the response or redirect as needed
      } catch (error) {
        console.error('An error occurred:', error);
      }
    },
  },
  setup() {
    const { t } = useI18n();
    return {
      t,
    };
  },
};
  </script>
  
  <style scoped>
  /* Modal overlay */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* overflow: scroll; */
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  /* Modal */
  .modal {
    width: auto;
    height: 500px;
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    overflow: scroll;
  }
  
  /* Form styles */
  .form {
    display: flex;
    flex-direction: column;
  }
  
  .card {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

  .label {
    font-weight: bold;
    margin-bottom: 8px;
  }
  
  .input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 12px;
  }
  
  /* Button styles */
  .button-container {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
  }
  
  .button {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .create-button {
    background-color: #3490dc;
    color: white;
  }
  
  .cancel-button {
    background-color: #ccc;
    color: #333;
  }
  
  .button:hover {
    background-color: #4a9ed9;
  }
  </style>