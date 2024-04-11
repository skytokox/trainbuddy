<template>
  <header class="">
    <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
      <div class="flex lg:flex-1">
        <a href="#" class="-m-1.5 p-1.5">
          <span class="sr-only">TrainBuddy</span>
          <img class="h-8 w-auto" src="https://lh3.googleusercontent.com/a/ACg8ocKzDeJfinBELfeO7yxcWrf-rkEcWev8leCex-zzk4NGxUiZvTTz=s83-c-mo" alt="" />
        </a>
      </div>
      <div class="flex lg:hidden">
        <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = true">
          <span class="sr-only">Open main menu</span>
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <PopoverGroup class="hidden lg:flex lg:gap-x-12">
        <RouterLink to="/" class="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200">Search station</RouterLink>
        <RouterLink to="/train_trip" class="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200">Search trip</RouterLink>
        <RouterLink to="/my_account" class="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200">My account</RouterLink>
      </PopoverGroup>
      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        <ColorSwitch />
        <a href="#" class="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200">Log in <span aria-hidden="true">&rarr;</span></a>
      </div>
    </nav>
    <Dialog as="div" class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
      <div class="fixed inset-0 z-10" />
      <DialogPanel class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white dark:bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div class="flex items-center justify-between">
          <a href="#" class="-m-1.5 p-1.5">
            <span class="sr-only">TrainBuddy</span>
            <img class="h-8 w-auto" src="https://lh3.googleusercontent.com/a/ACg8ocKzDeJfinBELfeO7yxcWrf-rkEcWev8leCex-zzk4NGxUiZvTTz=s83-c-mo" alt="" />
          </a>
          <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
            <span class="sr-only">Close menu</span>
            <XMarkIcon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="space-y-2 py-6">
              <RouterLink @click="mobileMenuOpen = false" to="/" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 dark:text-gray-200 text-gray-900 hover:bg-gray-50">Search station</RouterLink>
              <RouterLink @click="mobileMenuOpen = false" to="/train_trip" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 dark:text-gray-200 text-gray-900 hover:bg-gray-50">Search trip</RouterLink>
              <RouterLink @click="mobileMenuOpen = false" to="/my_account" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 dark:text-gray-200 text-gray-900 hover:bg-gray-50">My account</RouterLink>
            </div>
            <div class="py-6">
              <a href="#" class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 dark:text-gray-200 text-gray-900 hover:bg-gray-50">Log in</a>
              <ColorSwitch />
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/vue'
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/vue/20/solid'
import {RouterLink} from "vue-router";
import Switch from "~/components/ColorSwitch.vue";
import ColorSwitch from "~/components/ColorSwitch.vue";
const mobileMenuOpen = ref(false)

</script>
