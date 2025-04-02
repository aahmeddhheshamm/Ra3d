<script setup>
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
const localePath = useLocalePath()

const props = defineProps(['selectedAccordion', 'menuItems', 'icons']);
</script>

<template>
  <div class="dashboard-nav-links">
    <div>
      <div class="!bg-transparent !my-5 !mx-3">
        <Accordion :value="selectedAccordion">
          <AccordionPanel v-for="(tab, index) in menuItems" :key="tab.label" :value="index">
            <AccordionHeader v-if="tab?.items">
              <span class="flex items-center gap-2 panel-item">
                <component :is="icons[tab.icon]" class="" />
                <span class="font-bold flex-1 text-[14px]">{{
                    tab.label
                }}</span>
              </span>
            </AccordionHeader>
            <div v-else>
              <nuxt-link
                  :to="localePath(tab.route)"
                  class="text-[#9A9CAE] hover:text-white"
                  exact-active-class="!text-white"
                active-class="link-is-active"
              >
                <div class="flex items-center cursor-pointer px-[13px] py-[8px] panel-item">
                  <component :is="icons[tab.icon]" class="" />
                  <span class="mx-2 text-[14px] font-bold">{{
                      tab.label
                  }}</span>
                </div>
              </nuxt-link>
            </div>
            <AccordionContent v-for="items in tab.items" :key="tab.label">
              <nuxt-link
                  :to="localePath(items.route)"
                class="text-[#9A9CAE] hover:text-white"
                  exact-active-class="!text-white"
                active-class="link-is-active"
              >
                <div class="flex items-center cursor-pointer px-[13px] py-[8px] panel-item">
                  <component :is="icons[items.icon]" />
                  <span class="mx-2 text-[14px] font-semibold">{{
                      items.label
                  }}</span>
                </div>
              </nuxt-link>
            </AccordionContent>
          </AccordionPanel>
        </Accordion>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
