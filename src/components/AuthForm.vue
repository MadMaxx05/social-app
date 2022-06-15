<template>
  <div
    class="bg-white rounded-t-3xl md:rounded-3xl max-w-lg w-full mt-auto md:mt-0 mx-auto"
  >
    <form class="px-12 pt-6 pb-24 md:pb-6">
      <span class="block mt-3 font-bold text-lg md:text-base">{{
        type === 'login' ? 'Login' : 'Register'
      }}</span>
      <label
        class="inline-block text-base mt-10 md:mt-8 md:text-xs font-semibold text-gray-500"
        for="username"
      >
        <TheIcon icon="profile" class="inline-block mr-2.5 svg-gray" />
        Username</label
      >
      <input
        v-model="username"
        class="py-1.5 w-full text-lg font-semibold border-b border-gray-400 focus:border-blue-600 outline-0"
        type="text"
        id="username"
        autocomplete="off"
      />
      <label
        class="inline-block text-base mt-10 md:mt-8 md:text-xs font-semibold text-gray-500"
        for="password"
      >
        <TheIcon icon="lock" class="inline-block mr-2.5 svg-gray" />
        Password</label
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
        v-if="errors"
        class="mt-6 py-3 px-2 bg-red-100 text-red-500 border border-solid border-red-300 font-semibold rounded-md"
      >
        {{ errors }}
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
        >Create account
      </router-link>
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
    errors: {
      type: String,
    },
  },

  setup(props, context) {
    const username = ref('');
    const password = ref('');

    const isShowingPassword = ref(false);

    function onSubmit() {
      context.emit('submit', {
        username: username.value,
        password: password.value,
      });
    }

    return {
      username,
      password,
      isShowingPassword,
      onSubmit,
    };
  },
};
</script>
