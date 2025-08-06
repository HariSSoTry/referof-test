<template>
  <div class="modal-overlay" v-if="isOpen" @click.self="closeModal">
    <div class="modal">
      <button class="close-button" @click="closeModal">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 0.25C4.62391 0.25 0.25 4.62391 0.25 10C0.25 15.3761 4.62391 19.75 10 19.75C15.3761 19.75 19.75 15.3761 19.75 10C19.75 4.62391 15.3761 0.25 10 0.25ZM13.5302 12.4698C13.6027 12.5388 13.6608 12.6216 13.7008 12.7133C13.7409 12.805 13.7622 12.9039 13.7635 13.004C13.7648 13.1041 13.746 13.2034 13.7083 13.2961C13.6706 13.3889 13.6147 13.4731 13.5439 13.5439C13.4731 13.6147 13.3889 13.6706 13.2961 13.7083C13.2034 13.746 13.1041 13.7648 13.004 13.7635C12.9039 13.7622 12.805 13.7409 12.7133 13.7008C12.6216 13.6608 12.5388 13.6027 12.4698 13.5302L10 11.0608L7.53016 13.5302C7.38836 13.6649 7.19955 13.7389 7.00398 13.7364C6.8084 13.7339 6.62155 13.6551 6.48325 13.5168C6.34495 13.3785 6.26614 13.1916 6.26364 12.996C6.26114 12.8005 6.33513 12.6116 6.46984 12.4698L8.93922 10L6.46984 7.53016C6.33513 7.38836 6.26114 7.19955 6.26364 7.00398C6.26614 6.8084 6.34495 6.62155 6.48325 6.48325C6.62155 6.34495 6.8084 6.26614 7.00398 6.26364C7.19955 6.26114 7.38836 6.33513 7.53016 6.46984L10 8.93922L12.4698 6.46984C12.6116 6.33513 12.8005 6.26114 12.996 6.26364C13.1916 6.26614 13.3785 6.34495 13.5168 6.48325C13.6551 6.62155 13.7339 6.8084 13.7364 7.00398C13.7389 7.19955 13.6649 7.38836 13.5302 7.53016L11.0608 10L13.5302 12.4698Z" fill="#DFDEE3"/>
        </svg>
      </button>
      
      <div class="title-step">
        <h4>Создание промокода</h4>
        <div class="steps">
          <div class="step" :class="{ active: currentStep === 1 }">
            <span>Шаг 1: Основное</span>
          </div>
          <div class="step" :class="{ active: currentStep === 2 }">
            <span>Шаг 2: Настройки промокода</span>
          </div>
        </div>
      </div>

      <form @submit.prevent="submitForm">
        <!-- Шаг 1: Основная информация -->
        <div v-if="currentStep === 1" class="main-info">
          <div class="input-group">
            <label for="nameField">Название промокода</label>
            <Field 
              id="nameField"
              name="name" 
              v-model="formData.name" 
              autocomplete="off"
              :rules="nameRules" 
              @input="formatName"
              placeholder="Введите название промокода"
              class="input-field"
            />
            <ErrorMessage name="name" class="error-message" />
          </div>

          <div class="input-group">
            <label for="titleField">Заголовок</label>
            <Field 
              id="titleField"
              name="title" 
              v-model="formData.title" 
              autocomplete="off"
              :rules="titleRules"
              placeholder="Введите заголовок"
              class="input-field"
            />
            <ErrorMessage name="title" class="error-message" />
          </div>

          <div class="input-group">
            <label for="descriptionField">Сопроводительный текст</label>
            <Field 
              id="descriptionField"
              name="description" 
              v-model="formData.description" 
              autocomplete="off"
              :rules="descriptionRules"
              as="textarea"
              placeholder="Например: «Ты попал в число счастливчиков! Дарим 300 баллов»"
              class="textarea-field"
            />
            <div class="char-counter">{{ formData.description?.length || 0 }}/250</div>
            <ErrorMessage name="description" class="error-message" />
          </div>

          <div class="input-group">
            <label for="pointsField">Укажите количество баллов</label>
              <div class="input-with-icon">
                <div class="ref-coin-icon">
                  <RefCoinIcon />
                </div>
                <Field 
                  id="pointsField"
                  name="points" 
                  v-model="formData.points" 
                  autocomplete="off"
                  type="number"
                  placeholder="100"
                  class="input-field"
                />
              </div>
            <ErrorMessage name="points" class="error-message" />
          </div>
        </div>

        <!-- Шаг 2: Настройки промокода -->
        <div v-if="currentStep === 2" class="promo-settings">
          <div class="promo-duration">
            <label class="promo-duration-label">Срок действия промокода</label>
            <div class="date-inputs">
              <!-- Дата начала -->
              <div class="date-time-container" :class="{ 'full-width': formData.noEndDate }">
                <label>Дата начала</label>
                <div class="date-time-inputs">
                  <div class="date-input-wrapper">
                    <Field 
                      id="startDateField"
                      name="startDate" 
                      v-model="formData.startDate"
                      type="date"
                      class="input-field date-input"
                    />
                  </div>
                  <div class="time-input-wrapper">
                    <Field 
                      id="startTimeField"
                      name="startTime" 
                      v-model="formData.startTime"
                      type="time"
                      class="input-field time-input"
                    />
                  </div>
                </div>
                <ErrorMessage name="startDate" class="error-message" />
              </div>

              <!-- Дата окончания -->
              <div class="date-time-container" v-if="!formData.noEndDate">
                <label>Дата окончания</label>
                <div class="date-time-inputs">
                  <div class="date-input-wrapper">
                    <Field 
                      id="endDateField"
                      name="endDate" 
                      v-model="formData.endDate"
                      type="date"
                      class="input-field date-input"
                    />
                  </div>
                  <div class="time-input-wrapper">
                    <Field 
                      id="endTimeField"
                      name="endTime" 
                      v-model="formData.endTime"
                      type="time"
                      class="input-field time-input"
                    />
                  </div>
                </div>
                <ErrorMessage name="endDate" class="error-message" />
              </div>
            </div>
            
            <div class="checkbox-group">
              <input 
                type="checkbox" 
                id="noEndDate" 
                v-model="formData.noEndDate"
                @change="handleNoEndDateChange"
              />
              <label for="noEndDate">Без даты конца</label>
              <span v-if="formData.noEndDate" class="hint-text">(Промокод будет бессрочным)</span>
            </div>
          </div>

          <div class="divider"></div>

          <div class="input-group">
            <label for="activationLimitField">Введите лимит активаций (шт.)</label>
            <Field 
              id="activationLimitField"
              name="activationLimit" 
              v-model="formData.activationLimit" 
              autocomplete="off"
              :rules="activationLimitRules"
              type="number"
              placeholder="Введите лимит активаций"
              class="input-field"
            />
            <ErrorMessage name="activationLimit" class="error-message" />
          </div>

          <div class="divider"></div>

          <div class="input-group">
            <label>Настройка получения промокода</label>
            <div class="radio-list">
              <div class="radio-item">
                <Field 
                  name="receiptMethod" 
                  type="radio" 
                  value="auto" 
                  v-model="formData.receiptMethod"
                  id="autoMethod"
                />
                <label for="autoMethod">Создать промокод без отправки</label>
              </div>
              <div class="radio-item">
                <Field 
                  name="receiptMethod" 
                  type="radio" 
                  value="manual" 
                  v-model="formData.receiptMethod"
                  id="manualMethod"
                />
                <label for="manualMethod">Отправить промокод всем пользователям</label>
              </div>
            </div>
            <ErrorMessage name="receiptMethod" class="error-message" />
          </div>
        </div>

        <div class="buttons">
          <button 
            v-if="currentStep === 2" 
            type="button" 
            @click="prevStep" 
            class="secondary-button"
          >
            Назад
          </button>
          <button 
            v-else 
            type="button" 
            @click="closeModal" 
            class="secondary-button"
          >
            Отмена
          </button>
          
          <button type="submit" class="primary-button">
            {{ currentStep === 1 ? 'Далее' : 'Создать' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from 'vue'
import { Field, ErrorMessage, useForm } from 'vee-validate'
import * as yup from 'yup'
import RefCoinIcon from '@/components/icons/RefCoinIcon.vue'

interface PromoCodeForm {
  name: string;
  title: string;
  description: string;
  points: number | null;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  noEndDate: boolean;
  activationLimit: number | null;
  receiptMethod: string;
}

export default defineComponent({
  name: 'PromoCodeModal',
  components: {
    Field,
    ErrorMessage,
    RefCoinIcon,
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['close', 'submit'],
  setup(props, { emit }) {
    const currentStep = ref(1);
    
    const formData = ref<PromoCodeForm>({
      name: '',
      title: '',
      description: '',
      points: null,
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
      noEndDate: false,
      activationLimit: null,
      receiptMethod: '',
    });

    // Валидация для шага 1
    const step1Schema = yup.object({
      name: yup.string()
        .required('Название обязательно')
        .max(30, 'Максимальная длина 30 символов'),
      title: yup.string()
        .required('Заголовок обязателен')
        .max(120, 'Максимальная длина 120 символов'),
      description: yup.string()
        .max(250, 'Максимальная длина 250 символов'),
      points: yup.number()
        .required('Количество баллов обязательно')
        .typeError('Должно быть числом')
        .positive('Должно быть положительным числом'),
    });

    // Валидация для шага 2
    const step2Schema = yup.object({
      startDate: yup.string().required('Дата начала обязательна'),
      endDate: yup.string()
        .when('noEndDate', {
          is: false,
          then: (schema) => schema
            .required('Дата окончания обязательна')
            .test(
              'is-after-start',
              'Дата окончания должна быть после даты начала',
              function (value) {
                return !value || !this.parent.startDate || new Date(value) > new Date(this.parent.startDate);
              }
            ),
          otherwise: (schema) => schema.notRequired()
        }),
      activationLimit: yup.number()
        .required('Лимит активаций обязателен')
        .typeError('Должно быть числом')
        .integer('Должно быть целым числом')
        .min(1, 'Минимум 1 активация'),
      receiptMethod: yup.string()
        .required('Способ получения обязателен'),
    });

    const { validate, resetForm } = useForm({
      validationSchema: computed(() => currentStep.value === 1 ? step1Schema : step2Schema),
    });

    watch(currentStep, () => {
      resetForm({
        values: formData.value,
      });
    });

    watch(() => formData.value.noEndDate, (newValue) => {
      if (newValue) {
        formData.value.endDate = '';
        formData.value.endTime = '';
      }
    });

    const formatName = () => {
      formData.value.name = formData.value.name.toUpperCase();
    };

    const nextStep = async () => {
      const { valid } = await validate();
      if (valid) {
        currentStep.value = 2;
      }
    };

    const prevStep = () => {
      currentStep.value = 1;
    };

    const closeModal = () => {
      emit('close');
      currentStep.value = 1;
      resetForm();
    };

    const submitForm = async () => {
      if (currentStep.value === 1) {
        await nextStep();
        return;
      }

      if (!formData.value.startDate || !formData.value.startTime) {
        console.error('Дата начала обязательна');
        return;
      }

      const { valid } = await validate();
      if (valid) {
        const formattedData = {
          ...formData.value,
          startDateTime: `${formData.value.startDate}T${formData.value.startTime}`,
          endDateTime: formData.value.noEndDate 
            ? null 
            : (formData.value.endDate && formData.value.endTime 
                ? `${formData.value.endDate}T${formData.value.endTime}` 
                : null),
          isUnlimited: formData.value.noEndDate
        };
        
        console.log('Данные промокода:', formattedData);
        closeModal();
      }
    };

    const handleNoEndDateChange = async (event: Event) => {
      const target = event.target as HTMLInputElement;
      formData.value.noEndDate = target.checked;
      
      if (target.checked) {
        formData.value.endDate = '';
        formData.value.endTime = '';
      }
      
      await resetForm({
        values: formData.value,
      });
    };

    return {
      currentStep,
      formData,
      formatName,
      nextStep,
      prevStep,
      closeModal,
      handleNoEndDateChange,
      submitForm,
      // Правила валидации для отдельных полей (используются в :rules)
      nameRules: {
        required: true,
        max: 30,
      },
      titleRules: {
        required: true,
        max: 120,
      },
      descriptionRules: {
        max: 250,
      },
      pointsRules: {
        required: true,
        numeric: true,
      },
      startDateRules: {
        required: true,
      },
      endDateRules: {
        required: !formData.value.noEndDate,
      },
      activationLimitRules: {
        required: true,
        numeric: true,
      },
      receiptMethodRules: {
        required: true,
      },
    };
  },
});
</script>

<style scoped>
/* Базовые стили модального окна */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(17, 17, 17, 0.15);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  position: relative;
  width: 516px;
  background: #FFFFFF;
  border-radius: 16px;
  padding: 24px;
  box-sizing: border-box;
}

.close-button {
  position: absolute;
  right: 24px;
  top: 24px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
}

/* Стили заголовка и шагов */
.title-step {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  margin-bottom: 20px;
}

.title-step h4 {
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 25px;
  color: #1C1C1E;
  margin: 0;
}

.steps {
  display: flex;
  border-bottom: 1px solid #E5E5EA;
  width: 100%;
}

.step {
  flex: 1;
  text-align: center;
  padding: 8px 12px;
  box-sizing: border-box;
}

.step.active {
  border-bottom: 2px solid #107FD1;
}

.step.active span {
  font-weight: 600;
  color: #107FD1;
}

.step span {
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-size: 14px;
  line-height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.step:not(.active) span {
  font-weight: 500;
  color: #77777C;
}

/* Общие стили для полей ввода */
.input-group {
  margin-bottom: 16px;
  width: 100%;
  text-align: left;
}

.input-group label {
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #1C1C1E;
  margin-bottom: 6px;
  display: block;
}

.input-group label:after {
  content: '*';
  color: #FF3B30;
  margin-left: 2px;
}

.input-group label[for="name"]:after,
.input-group label[for="title"]:after,
.input-group label[for="points"]:after,
.input-group label[for="activationLimit"]:after,
.promo-duration-label:after {
  content: '*';
  color: #FF3B30;
  margin-left: 2px;
}

.input-group label[for="description"]:after,
.radio-item label:after,
.checkbox-group label:after,
.date-time-container label:after {
  content: none !important;
}

.promo-duration-label:after {
  content: '*';
  color: #FF3B30;
  margin-left: 2px;
}

.input-group label,
.promo-duration-label {
  font-weight: 600 !important; /* Жирный шрифт */
  color: #1C1C1E;
}

.checkbox-group label,
.radio-item label {
  font-weight: 500 !important;
}

.input-field {
  width: 100%;
  height: 44px;
  padding: 16px 12px;
  background: #F5F5F5;
  border-radius: 12px;
  border: none;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #1C1C1E;
  box-sizing: border-box;
}

.input-field:focus {
  outline: none;
  background: #E5E5EA;
}

.input-field::placeholder {
  color: #77777C;
}

/* Стили для текстового поля */
.textarea-field {
  width: 100%;
  height: 90px;
  padding: 16px 12px;
  background: #F5F5F5;
  border-radius: 12px;
  border: none;
  resize: none;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  line-height: 18px;
  box-sizing: border-box;
  min-height: 90px;
  max-width: 100%;
}

.textarea-field:focus {
  outline: none;
  background: #E5E5EA;
}

.char-counter {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  line-height: 16px;
  text-align: right;
  color: #ADAEB2;
  margin-top: 4px;
}

/* Стили для ошибок */
.error-message {
  color: #FF3B30;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  line-height: 16px;
  margin-top: 4px;
}

.input-group:has(.error-message:not(:empty)) .error-message {
  visibility: visible;
}

.input-group:has(.error-message:not(:empty)) .input-field,
.input-group:has(.error-message:not(:empty)) .textarea-field {
  border: 1px solid #FF3B30;
}

/* Стили для поля с иконкой */
.input-with-icon {
  position: relative;
  width: 100%;
}

.ref-coin-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.input-with-icon .input-field {
  padding-left: 44px;
}

/* Стили для блока с датами */
.promo-duration {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

.promo-duration-label {
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  color: #1C1C1E;
  text-align: left;
}

.date-inputs {
  display: flex;
  gap: 20px;
  width: 100%;
}

.date-time-container {
  flex: 1;
  text-align: left;
}

.date-time-inputs {
  display: flex;
  gap: 6px;
}

.date-input {
  width: 140px;
}

.time-input {
  width: 80px;
  padding-right: 30px;
  text-align: center;
}

.time-input::-webkit-calendar-picker-indicator {
  display: none;
}

.date-input,
.time-input {
  height: 44px;
  padding: 16px 12px;
  background: #F5F5F5;
  border-radius: 12px;
  border: none;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  line-height: 18px;
}

/* Стили для чекбокса */
.checkbox-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.checkbox-group input[type="checkbox"] {
  width: 20px;
  height: 20px;
  border: 1px solid #DFDEE3;
  border-radius: 4px;
  appearance: none;
  position: relative;
  cursor: pointer;
}

.checkbox-group input[type="checkbox"]:checked {
  background: #107FD1;
  border-color: #107FD1;
}

.checkbox-group input[type="checkbox"]:checked::after {
  content: "";
  position: absolute;
  width: 10px;
  height: 10px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 2px;
}

.checkbox-group label {
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #05263F;
}

/* Разделитель */
.divider {
  height: 1px;
  background: #EBEBF0;
  margin: 16px 0;
  width: 100%;
}

/* Стили для радио-кнопок */
.radio-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 8px;
}

.radio-item {
  display: flex;
  align-items: flex-start;;
  gap: 8px;
  height: 20px;
}

.radio-item input[type="radio"] {
  width: 20px;
  height: 20px;
  appearance: none;
  border: 1.5px solid #C7C7CC;
  border-radius: 50%;
  position: relative;
  cursor: pointer;
  margin: 0;
  flex-shrink: 0;
}

.radio-item input[type="radio"]:checked {
  border-color: #107FD1;
  background: #107FD1;
}

.radio-item input[type="radio"]:checked::after {
  content: "";
  position: absolute;
  width: 10px;
  height: 10px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 50%;
}

.radio-item label {
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #05263F;
  align-items: center;
  padding-top: 1px;
}

/* Стили для кнопок */
.buttons {
  display: flex;
  gap: 12px;
  margin-top: 20px;
  width: 100%;
}

.primary-button,
.secondary-button {
  flex: 1;
  height: 40px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.primary-button {
  background: #05263F;
  color: #FFFFFF;
}

.primary-button:hover {
  background: #031A2C;
}

.secondary-button {
  background: #F2F1F6;
  color: #77777C;
}

.secondary-button:hover {
  background: #E5E5EA;
}

.hint-text {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: #77777C;
  margin-left: 8px;
}

/* Адаптивность */
@media (max-width: 600px) {
  .modal {
    width: 90vw;
    padding: 16px;
  }
  
  .date-inputs {
    flex-direction: column;
    gap: 16px;
  }
  
  .date-time-container {
    width: 100%;
  }
  
  .date-time-inputs {
    width: 100%;
  }
  
  .date-input {
    width: 100%;
  }
  
  .buttons {
    flex-direction: column;
  }
  
  .primary-button,
  .secondary-button {
    width: 100%;
  }
}
</style>