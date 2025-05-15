<script setup>
definePageMeta({
  layout: "seller",
  middleware:'auth'
});
import useRdpLocations from "~/composables/hosts/useRdpLocations.js";
const {rdpLocations, pending} = await useRdpLocations();

const {$intercept} = useNuxtApp()
const localePath = useLocalePath()

const newRdp = ref({
  username: "",
  password: "",
  ip: "",
  price: "",
  ram_size: "",
  cpu_cores: "",
  access_type: "",
  windows_type: "",
  rdp_type: "",
  location: "",
})

const RdpType = ref([
  {
    title: 'Created',
    id: 'Created'
  },
  {
    title: 'Hacked / Cracked',
    id: 'Hacked / Cracked'
  }
])

const RdpUserAccessType = ref([
  {
    title: 'Admin',
    id: 'Admin'
  },
  {
    title: 'User',
    id: 'User'
  }
])

const RdpWindowsType = ref([
  {
    title: "Windows",
    id: "Windows",
  },
  {
    title: "Win XP",
    id: "Win XP",
  },
  {
    title: "Win Vista",
    id: "Win Vista",
  },
  {
    title: "Win 2003",
    id: "Win 2003",
  },
  {
    title: "Win 2008",
    id: "Win 2008",
  },
  {
    title: "Win 7",
    id: "Win 7",
  },
  {
    title: "Win 8",
    id: "Win 8",
  },
  {
    title: "Win 10",
    id: "Win 10",
  },
  {
    title: "Win Server 2012",
    id: "Win Server 2012",
  },
  {
    title: "Win Server 2016",
    id: "Win Server 2016",
  },
  {
    title: "Win Server 2019",
    id: "Win Server 2019",
  },
  {
    title: "Win Server 2022",
    id: "Win Server 2022",
  },
  {
    title: "Win Server 2025",
    id: "Win Server 2025",
  },
  {
    title: "Other",
    id: "Other"
  }
])

const apiAddNewRdp = (data) => $intercept('rdp/seller/rdp/', {
  method: "POST",
  body: JSON.stringify(data)
})

const {mutate, isPending} = useMutate({
  mutationFn: apiAddNewRdp,
});

// function jsonToFormData(json) {
//   const formData = new FormData();
//
//   for (const key in json) {
//     if (json.hasOwnProperty(key)) {
//       formData.append(key, json[key]);
//     }
//   }
//
//   return formData;
// }


 function createNewRdp() {
  // const formData =  jsonToFormData(newRdp.value);
  mutate(newRdp.value, {
    onSuccess(res){
      console.log('res', res)
      setTimeout(()=>{
        navigateTo(localePath('/dashboard/products/rdp'));
      },1000)
    },
  });
}

</script>

<template>
  <UIPageHeader
      breadcrumb-title="All RDP"
      title="Add New"
      back-route-name="/dashboard/products/rdp"
  >

  </UIPageHeader>

  <UIBox>
    <div class="flex items-center justify-between">
      <UITitle title="Add New" />

    </div>
    <ValidationForm class="w-full flex flex-col gap-[8px] mt-[12px]" @submit="createNewRdp" autocomplete="off" >
      <div class="grid grid-cols-2 gap-x-4 gap-y-4">
        <UIFormInputField
            name="username"
            v-model="newRdp.username"
            validation="required"
            type="text"
            label="Username"
            placeholder="Enter username"
            id="username"
        />
        <UIFormPasswordField
            name="password"
            id="password"
            placeholder="Enter password"
            label="password"
            validation="required|password"
            v-model="newRdp.password"
        />

        <UIFormInputField
            name="ip"
            v-model="newRdp.ip"
            validation="required"
            type="text"
            label="IP/Host"
            placeholder="Enter IP/Host"
            id="ip"
        />
        <UIFormInputField
            name="price"
            v-model="newRdp.price"
            validation="required|integer"
            type="text"
            label="Price"
            placeholder="Enter price"
            id="price"
        />

        <UIFormInputField
            name="ram"
            v-model="newRdp.ram_size"
            validation="required|integer"
            type="text"
            label="Ram Size"
            placeholder="Enter ram size"
            id="ram"
        />
        <UIFormInputField
            name="cpu"
            v-model="newRdp.cpu_cores"
            validation="required|integer"
            type="text"
            label="Cpu cores"
            placeholder="Enter cpu cores"
            id="cpu"
        />

        <div class="col-span-2 grid grid-cols-4 gap-x-2">
          <div class="">
            <UIFormLabelField label="User Access" />
            <Dropdown
                v-model="newRdp.access_type"
                filter
                empty-filter-message="No result"
                empty-message="No available options"
                countryLoading
                :options="RdpUserAccessType"
                option-value="id"
                optionLabel="title"
                placeholder="Select user access"
                :highlightOnSelect="true"
                class="bg-white w-full  font-medium text-sm !rounded-[8px]"
            />
          </div>
          <div class="">
            <UIFormLabelField label="Windows" />
            <Dropdown
                v-model="newRdp.windows_type"
                filter
                empty-filter-message="No result"
                empty-message="No available options"
                countryLoading
                :options="RdpWindowsType"
                option-value="id"
                optionLabel="title"
                placeholder="Select windows"
                :highlightOnSelect="true"
                class="bg-white w-full  font-medium text-sm !rounded-[8px]"
            />
          </div>
          <div class="">
            <UIFormLabelField label="Type" />
            <Dropdown
                v-model="newRdp.rdp_type"
                filter
                empty-filter-message="No result"
                empty-message="No available options"
                countryLoading
                :options="RdpType"
                option-value="id"
                optionLabel="title"
                placeholder="Select type"
                :highlightOnSelect="true"
                class="bg-white w-full  font-medium text-sm !rounded-[8px]"
            />
          </div>
          <div class="">
            <UIFormLabelField label="Locations" />
            <Dropdown
                v-model="newRdp.location"
                filter
                empty-filter-message="No result"
                empty-message="No available options"
                pending
                :options="rdpLocations"
                option-value=""
                optionLabel=""
                placeholder="Select locations"
                :highlightOnSelect="true"
                class="bg-white w-full  font-medium text-sm !rounded-[8px]"
            />
          </div>
        </div>


      </div>
      <UIButtonsPrimaryButton
          type="submit"
          :loading="isPending"
          :disabled="isPending"
          submitTitle="Add"
          :class="[{ 'btn-disabled': isPending }, '!px-4 !py-[9px] !text-[14px] mt-4 !rounded-[4px] w-full']"
      />

    </ValidationForm>

  </UIBox>

</template>

<style scoped>

</style>