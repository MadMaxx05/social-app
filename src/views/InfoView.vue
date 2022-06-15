<script setup>
import { useUserStore } from '@/stores/user';
import { ref } from 'vue';
import InfoLayout from '@/layouts/InfoLayout.vue';
import ChangeInfo from '@/components/ChangeInfo.vue';

const userStore = useUserStore();

const user = ref({
  fullName: '',
  country: '',
  city: '',
  description: '',
  contact: '',
});

const interests = ref('');

function setInfo() {
  userStore.info = true;
}
</script>

<template>
  <InfoLayout>
    <template #form>
      <ChangeInfo
        type="addInfo"
        :user="user"
        :interests="interests"
        @added-info="setInfo"
      />
    </template>
  </InfoLayout>
</template>
