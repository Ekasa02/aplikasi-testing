<template>
    <div class="font-montserrat fixed inset-0 flex items-center justify-center">
        <div class="bg-white p-8 rounded-lg shadow-lg w-[35%] max-h-[80vh] overflow-hidden">
            <div class="flex justify-between">
                <h1 class="font-Montserrat font-bold text-2xl pr-12">Create scenario</h1>
                <img src="../createversion/svg/CloseCircle.svg" class="cursor-pointer" alt="Close Icon" @click="closeModal">
            </div>
            <hr class="border-gray-300 my-4 w-full">
            <div class="overflow-y-auto max-h-[60vh] pr-5">
                <form @submit.prevent="createTestCase">
                    <div class="relative">
                        <label class="block  font-bold text-[14px] mb-2" for="testcase">
                            Description
                        </label>
                        <input id="testcase" v-model="newItem.testcase"
                            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text" placeholder="Scenario" required>
                    </div>
                    <div class="relative pt-[15px]">
                        <label class="block font-Montserrat font-bold text-[14px] mb-2" for="scenario">
                            Features
                        </label>
                        <div class="flex items-center">
                            <select id="scenario"
                                class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                v-model="newItem.scenario_id">
                                <option value="" disabled>Select Features</option>
                                <option v-for="scenarioItem in scenario" :value="scenarioItem.id" :key="scenarioItem.id">
                                    {{ scenarioItem.name }}
                                </option>
                            </select>
                            <div class="hover:opacity-80 text-white font-bold py-2 px-2.5 rounded-xl ml-3 border border-gray-300"
                                @click="showScenario">
                                <img src="./svg/Plus.svg" alt="Plus Icon" class="h-5 w-5">
                            </div>
                        </div>
                    </div>
                    <div class="pt-[15px] relative">
                        <label class="block font-['Montserrat'] font-bold text-[14px] mb-2" for="test-category">
                            Test category
                        </label>
                        <div class="flex items-center">
                            <select id="test-category" v-model="newItem.test_category"
                                class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                <option value="" disabled selected>Test category</option>
                                <option value="positif">Positive</option>
                                <option value="negatif">Negative</option>
                            </select>
                        </div>
                    </div>
                    <div class="pt-[15px] relative">
                        <label class="block font-['Montserrat'] font-bold text-[14px] mb-2" for="pre-condition">
                            Pre condition
                        </label>
                        <textarea id="pre-condition"
                            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            rows="4" placeholder="Pre condition" required v-model="newItem.pre_condition">
                        </textarea>
                    </div>

                    <div class="pt-[15px] relative">
                        <label class="block font-['Montserrat'] font-bold text-[14px] mb-2" for="test-step">
                            Test steps
                        </label>
                        <textarea id="test-step"
                            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            rows="4" placeholder="Steps" required v-model="newItem.test_step">
              </textarea>
                    </div>
                    <div class="pt-[15px] relative">
                        <label class="block font-['Montserrat'] font-bold text-[14px] mb-2" for="expectation">
                            Expectation
                        </label>
                        <input id="expectation"
                            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text" placeholder="Expectation" required v-model="newItem.expectation">
                    </div>
                    <div class="pt-[50px]">
                        <button class="font-['Montserrat'] bg-[#554AF0] text-white font-bold py-2 px-4 rounded"
                            type="submit">
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <TestScenario v-if="isScenarioVisible" :id="id" :project-id="projectId" @hideScenario="hideScenario" />
    </div>
</template>
  
<script>
import TestScenario from './TestScenario.vue';

export default {
    components: { TestScenario },
    props: {
        id: {
            type: Number,
            required: true
        },
        projectId: {
            type: Number,
            required: true
        },
    },
    data() {
        return {
            isScenarioVisible: false,
            newItem: {
                scenario_id: '',
                version_id: '',
                testcase: '',
                test_category: '',
                pre_condition: '',
                test_step: '',
                expectation: ''
            },
            scenario: []
        };
    },
    mounted() {
        this.getScenario();
    },
    methods: {
        showScenario() {
            this.isScenarioVisible = true;
        },
        hideScenario() {
            this.isScenarioVisible = false;
            this.getScenario();
        },
        closeModal() {
            this.$emit("hideCreate");
        },
        async getScenario() {
            try {
                const response = await this.$axios.$get(`/scenarios/?project_id=${this.projectId}`);
                console.log(response);
                this.scenario = response.data;
            } catch (e) {
                console.log(e);
            }
        },
        async createTestCase() {
            if (!this.newItem.scenario_id || !this.newItem.testcase || !this.newItem.test_category || !this.newItem.pre_condition || !this.newItem.test_step || !this.newItem.expectation) {
                // Check if any of the required fields are empty
                console.log('Please fill in all the required fields.');
                return;
            }
            this.newItem.version_id = this.id;
            try {
                await this.$axios.$post('/test_cases', this.newItem);
                window.location.reload();
            } catch (error) {
                console.log(error);
            }
            // Reset form fields
            this.newItem = {
                scenario_id: '',
                version_id: '',
                testcase: '',
                test_category: '',
                pre_condition: '',
                test_step: '',
                expectation: ''
            };
        }
    }
};
</script>
  