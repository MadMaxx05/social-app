<script setup>
import router from '@/router/index';
import { ref, toRef, computed, watch } from 'vue';
import { useUserStore } from '@/stores/user';
import TheIcon from '@/components/TheIcon.vue';

const props = defineProps({
  type: {
    type: String,
    default: 'addInfo',
  },
  user: {
    type: Object,
    default: () => {},
  },
  interests: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['logout', 'addedInfo']);
const userStore = useUserStore();
const isUpdated = ref(false);
const user = toRef(props, 'user');
const interests = ref('');
const interestsProp = toRef(props, 'interests');

const fullNameValidation = ref(true);
const descriptionValidation = ref(true);
const interestsValidation = ref(true);
const contactValidation = ref(true);

watch(interestsProp, () => {
  interests.value = interestsProp.value;
});

const interestsToArray = computed(() => {
  const spaced = interests.value.replace(/,/g, ', ');
  const array = spaced.split(', ').map((item) => item.trim());
  return array.map((item) => {
    return item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
  });
});

function validateFullName() {
  fullNameValidation.value = !!user.value.fullName.length > 0;
  return user.value.fullName.length > 0;
}

function validateDescription() {
  descriptionValidation.value = !!user.value.description.length > 0;
  return user.value.description.length > 0;
}

function validateInterests() {
  interestsValidation.value = !!interests.value.length > 0;
  return interests.value.length > 0;
}

function validateContact() {
  contactValidation.value = !!user.value.contact.length > 0;
  return user.value.contact.length > 0;
}

async function changeData() {
  if (
    validateFullName() &&
    validateDescription() &&
    validateInterests() &&
    validateContact()
  ) {
    try {
      await userStore.changeFullName(user.value.fullName);
      await userStore.changeCountry(user.value.country);
      await userStore.changeCity(user.value.city);
      await userStore.changeDescription(user.value.description);
      await userStore.changeInterests(interestsToArray.value);
      await userStore.changeContact(user.value.contact);
      if (props.type === 'addInfo') {
        emit('addedInfo');
        router.push({ name: 'home' });
      }

      isUpdated.value = true;
      setTimeout(() => (isUpdated.value = false), 4000);
    } catch (error) {
      console.log(error);
    }
  } else window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>

<template>
  <div
    v-if="props.type === 'editInfo' && isUpdated"
    class="py-2 text-center text-white bg-green-500"
  >
    Data updated successfully
  </div>
  <div class="pt-8 px-5">
    <div class="mb-7 flex justify-between items-center">
      <span class="inline-block text-3xl text-slate-700 font-bold">{{
        props.type === 'addInfo' ? 'Tell about yourself' : 'Your Account'
      }}</span>
      <div
        v-if="props.type === 'editInfo'"
        @click="changeData"
        class="flex gap-2 cursor-pointer"
      >
        <span class="text-lg text-slate-700 text-blue-700">Save</span>
        <TheIcon icon="tick-square" />
      </div>
    </div>
    <div class="grid gap-5">
      <div class="grid justify-items-center gap-3">
        <img
          class="inline-block w-[100px] h-[100px] rounded-full"
          src="@/assets/images/no-avatar.png"
          alt
        />
        <span class="text-lg text-blue-700 cursor-pointer">Change photo</span>
      </div>
      <div>
        <div>
          <label class="inline-block text-base text-slate-500" for="name"
            >Name</label
          >
          <input
            class="block w-full py-1.5 text-lg text-slate-700 border-b border-gray-300 focus:border-blue-600 outline-0"
            type="text"
            id="name"
            autocomplete="off"
            v-model="user.fullName"
          />
          <div v-if="!fullNameValidation" class="text-red-500">
            This field is required
          </div>
        </div>
      </div>
      <div>
        <label class="inline-block text-base text-slate-500" for="country"
          >Country</label
        >
        <input
          class="block w-full py-1.5 text-lg text-slate-700 border-b border-gray-300 focus:border-blue-600 outline-0"
          type="text"
          id="country"
          autocomplete="off"
          v-model="user.country"
        />
      </div>
      <div>
        <label class="inline-block text-base text-slate-500" for="city"
          >City</label
        >
        <input
          class="block w-full py-1.5 text-lg text-slate-700 border-b border-gray-300 focus:border-blue-600 outline-0"
          type="text"
          id="city"
          autocomplete="off"
          v-model="user.city"
        />
      </div>
      <div>
        <label class="inline-block text-base text-slate-500" for="description"
          >About yourself</label
        >
        <input
          class="block w-full py-1.5 text-lg text-slate-700 border-b border-gray-300 focus:border-blue-600 outline-0"
          type="text"
          id="description"
          autocomplete="off"
          v-model="user.description"
        />
        <div v-if="!descriptionValidation" class="text-red-500">
          This field is required
        </div>
      </div>
      <div>
        <label class="inline-block text-base text-slate-500" for="interests">{{
          props.type === 'addInfo' ? 'What are your interests' : 'Interests'
        }}</label>
        <input
          class="block w-full py-1.5 text-lg text-slate-700 border-b border-gray-300 focus:border-blue-600 outline-0"
          type="text"
          id="interests"
          autocomplete="off"
          v-model="interests"
        />
        <div v-if="!interestsValidation" class="text-red-500">
          This field is required
        </div>
        <div class="mt-2 flex items-start gap-2">
          <TheIcon icon="info-circle" />
          <div>
            <span class="block text-yellow-600"
              >Separate interests with a comma.
            </span>
            <span class="block text-yellow-600"
              >For example: Yachting, Travelling, etc.</span
            >
          </div>
        </div>
      </div>
      <div>
        <label class="inline-block text-base text-slate-500" for="contact">{{
          props.type === 'addInfo' ? 'Leave your contact' : 'Contact'
        }}</label>
        <input
          class="block w-full py-1.5 text-lg text-slate-700 border-b border-gray-300 focus:border-blue-600 outline-0"
          type="text"
          id="contact"
          autocomplete="off"
          v-model="user.contact"
        />
        <div v-if="!contactValidation" class="text-red-500">
          This field is required
        </div>
        <div class="mt-2 flex items-start gap-2">
          <div>
            <span class="block text-yellow-600">For example:</span>
            <span class="block text-yellow-600">Telegram: @heyiamjohndoe</span>
          </div>
        </div>
      </div>
      <button
        @click="changeData"
        v-if="props.type === 'addInfo'"
        class="mx-auto block mt-5 py-4 bg-blue-600 hover:bg-white border-2 transition border-blue-600 rounded-xl w-full max-w-xl text-xl text-white hover:text-blue-600"
      >
        Get Started
      </button>
    </div>
    <ul v-if="props.type === 'editInfo'" class="mt-10 grid justify-items-start">
      <li
        @click="emit('logout')"
        class="py-3 flex gap-2 border-b border-solid border-gray-300 last:border-0 cursor-pointer"
      >
        <TheIcon icon="logout" />
        <span class="text-lg text-slate-700">Logout</span>
      </li>
    </ul>
  </div>
</template>
