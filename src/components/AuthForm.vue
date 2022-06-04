<template>
  <div
    class="bg-white rounded-t-3xl md:rounded-3xl max-w-lg w-full mt-auto md:mt-0 mx-auto"
  >
    <form class="px-12 pt-6 pb-24 md:pb-6">
      <span class="block mt-3 font-bold text-lg md:text-base">{{
        type === 'login' ? 'Login' : 'Register'
      }}</span>
      <label
        v-if="type === 'register'"
        class="inline-block text-base mt-10 md:mt-8 md:text-xs font-semibold text-gray-500"
        for="name"
        ><TheIcon
          icon="profile"
          class="inline-block mr-2.5 svg-gray"
        />Name</label
      >
      <input
        v-if="type === 'register'"
        v-model="name"
        class="py-1.5 w-full text-lg font-semibold border-b border-gray-400 focus:border-blue-600 outline-0"
        type="text"
        id="name"
        autocomplete="none"
      />
      <label
        class="inline-block text-base mt-10 md:mt-8 md:text-xs font-semibold text-gray-500"
        for="email"
        ><TheIcon
          icon="message"
          class="inline-block mr-2.5 svg-gray"
        />Email</label
      >
      <input
        v-model="email"
        class="py-1.5 w-full text-lg font-semibold border-b border-gray-400 focus:border-blue-600 outline-0"
        type="email"
        id="email"
        autocomplete="none"
      />
      <div
        v-show="!emailValidation"
        class="mt-3 p-2 bg-red-200 text-red-900 rounded text"
      >
        Invalid email address
      </div>
      <label
        class="inline-block text-base mt-10 md:mt-8 md:text-xs font-semibold text-gray-500"
        for="password"
        ><TheIcon
          icon="lock"
          class="inline-block mr-2.5 svg-gray"
        />Password</label
      >
      <div class="relative">
        <input
          v-model="password"
          class="py-1.5 pr-12 w-full text-lg font-semibold border-b border-gray-400 focus:border-blue-600 outline-0"
          :type="isShowingPassword ? 'text' : 'password'"
          id="password"
        />
        <span
          class="absolute bottom-[23%] right-0 text-base md:text-xs text-blue-600 font-semibold cursor-pointer hover:underline"
          @click="isShowingPassword = !isShowingPassword"
          >{{ isShowingPassword ? 'Hide' : 'Show' }}</span
        >
      </div>
      <div
        v-show="!passwordValidation"
        class="mt-3 p-2 bg-red-200 text-red-900 rounded text"
      >
        Password length must be at least 8 characters
      </div>
      <span
        v-if="type === 'login'"
        class="inline-block mt-6 text-base md:text-xs text-blue-600 font-semibold cursor-pointer hover:underline"
        >Forgot passcode?</span
      >
      <label
        v-if="type === 'register'"
        class="inline-block text-base mt-10 md:mt-8 md:text-xs font-semibold text-gray-500"
        for="password-confirmation"
        ><TheIcon icon="lock" class="inline-block mr-[10px] svg-gray" />Password
        confirmation</label
      >
      <div v-if="type === 'register'" class="relative">
        <input
          v-model="passwordConfirmation"
          class="py-1.5 w-full text-lg font-semibold border-b border-gray-400 focus:border-blue-600 outline-0"
          :type="isShowingPasswordConfirmation ? 'text' : 'password'"
          id="password-confirmation"
        />
        <span
          class="absolute bottom-[23%] right-0 text-base md:text-xs text-blue-600 font-semibold cursor-pointer hover:underline"
          @click="
            isShowingPasswordConfirmation = !isShowingPasswordConfirmation
          "
          >{{ isShowingPasswordConfirmation ? 'Hide' : 'Show' }}</span
        >
      </div>
      <div
        v-if="type === 'register'"
        v-show="!passwordConfirmationValidation"
        class="mt-3 p-2 bg-red-200 text-red-900 rounded text"
      >
        Password confirmation doesn't match
      </div>
      <button
        class="block mt-16 md:mt-10 py-6 md:py-4 bg-blue-600 hover:bg-white border-2 transition border-blue-600 rounded-xl w-full text-xl text-white hover:text-blue-600 font-bold"
        type="submit"
        @click.prevent="onSubmit"
      >
        {{ type === 'login' ? 'Login' : 'Sign in' }}
      </button>
      <span
        v-if="type === 'register'"
        class="block mt-6 text-base text-gray-500 font-semibold text-center"
        >Already have an account?
        <router-link
          to="/login"
          class="inline-block text-base text-blue-600 font-semibold text-center cursor-pointer hover:underline"
          >Login</router-link
        >
      </span>
      <router-link
        v-else
        to="/register"
        class="block mt-6 text-base text-blue-600 font-semibold text-center cursor-pointer hover:underline"
        >Create account</router-link
      >
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import TheIcon from '@/components/TheIcon.vue';

export default {
  name: 'AuthForm',
  components: {
    TheIcon,
  },
  props: {
    type: {
      type: String,
      default: 'login',
    },
  },

  setup(props, context) {
    const type = ref(props.type);

    const name = ref('');
    const email = ref('');
    const password = ref('');
    const passwordConfirmation = ref('');

    const emailValidation = ref(true);
    const passwordValidation = ref(true);
    const passwordConfirmationValidation = ref(true);

    const isShowingPassword = ref(false);
    const isShowingPasswordConfirmation = ref(false);

    function validateEmail() {
      return (emailValidation.value = !!email.value.match(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      ));
    }

    function validatePassword() {
      return (passwordValidation.value = password.value.length >= 8);
    }

    function validatePasswordConfirmation() {
      if (type.value === 'login') return true;
      return (passwordConfirmationValidation.value =
        passwordConfirmation.value === password.value);
    }

    function onSubmit() {
      if (
        validateEmail() &&
        validatePassword() &&
        validatePasswordConfirmation()
      ) {
        context.emit('submit', {
          name: name.value,
          email: email.value,
          password: password.value,
          passwordConfirmation: passwordConfirmation.value,
        });
      }
    }

    return {
      name,
      email,
      emailValidation,
      password,
      passwordValidation,
      passwordConfirmation,
      passwordConfirmationValidation,
      isShowingPassword,
      isShowingPasswordConfirmation,
      onSubmit,
    };
  },
};
</script>
