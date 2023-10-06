<template>
	<el-form size="small">
		<el-form-item>
			<el-radio v-model='radioValue' :label="1">
				不填，允许的通配符[, - * /]
			</el-radio>
		</el-form-item>

		<el-form-item>
			<el-radio v-model='radioValue' :label="2">
				每年
			</el-radio>
		</el-form-item>

		<el-form-item>
			<el-radio v-model='radioValue' :label="3">
				周期从
				<el-input-number v-model='cycle01' :min='fullYear' /> -
				<el-input-number v-model='cycle02' :min='fullYear' />
			</el-radio>
		</el-form-item>

		<el-form-item>
			<el-radio v-model='radioValue' :label="4">
				从
				<el-input-number v-model='average01' :min='fullYear' /> 年开始，每
				<el-input-number v-model='average02' :min='fullYear' /> 年执行一次
			</el-radio>

		</el-form-item>

		<el-form-item>
			<el-radio v-model='radioValue' :label="5">
				指定
				<el-select v-model="checkboxList" clearable placeholder="可多选" multiple>
					<el-option v-for="item in 9" :key="item" :value="item - 1 + fullYear" :label="item - 1 + fullYear" />
				</el-select>
			</el-radio>
		</el-form-item>
	</el-form>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed, ref, watchEffect } from 'vue'

export default defineComponent({
	name: 'CrontabYear',
	props: {
		checkNumber: {
			type: Function,
			default: () => { }
		},
		cron: {
			type: Object,
			default: () => ({})
		},
		mouth: {
			type: Number,
			default: 0
		}
	},
	emits: ['update'],
	setup(props, { emit }) {
		return {
		}
	},
	data() {
		return {
			fullYear: Number(new Date().getFullYear()),
			radioValue: 1,
			cycle01: 0,
			cycle02: 0,
			average01: 0,
			average02: 1,
			checkboxList: [],
		}
	},
	computed: {
		cycleObj() {
			return {
				cycle01: this.cycle01,
				cycle02: this.cycle02
			}
		},
		averageObj() {
			return {
				average01: this.average01,
				average02: this.average02
			}
		},
		// 计算勾选的checkbox值合集
		checkboxString() {
			const str = this.checkboxList.join();
			return str;
		}
	},
	watch: {
		"radioValue": "radioChange",
		'cycleObj': 'cycleChange',
		'averageObj': 'averageChange',
		'checkboxString': 'checkboxChange'
	},
	mounted() {
	},
	methods: {
		// 单选按钮值变化时
		radioChange() {
			if (this.cron.mouth === '*') {
				this.$emit('update', 'mouth', '0', 'year');
			}
			if (this.cron.day === '*') {
				this.$emit('update', 'day', '0', 'year');
			}
			if (this.cron.hour === '*') {
				this.$emit('update', 'hour', '0', 'year');
			}
			if (this.cron.min === '*') {
				this.$emit('update', 'min', '0', 'year');
			}
			if (this.cron.second === '*') {
				this.$emit('update', 'second', '0', 'year');
			}
			switch (this.radioValue) {
				case 1:
					this.$emit('update', 'year', '');
					break;
				case 2:
					this.$emit('update', 'year', '*');
					break;
				case 3:
					this.$emit('update', 'year', `${this.cycle01}-${this.cycle02}`);
					break;
				case 4:
					this.$emit('update', 'year', `${this.average01}/${this.average02}`);
					break;
				case 5:
					this.$emit('update', 'year', this.checkboxString);
					break;
				default:
					break;
			}
		},
		// 周期两个值变化时
		cycleChange() {
			if (this.radioValue === 3) {
				this.cycle01 = this.checkNumber(this.cycle01, this.fullYear, this.fullYear + 100)
				this.cycle02 = this.checkNumber(this.cycle02, this.fullYear + 1, this.fullYear + 101)
				const cycleTotal = `${this.cycle01}-${this.cycle02}`;
				this.$emit('update', 'year', cycleTotal);
			}
		},
		// 平均两个值变化时
		averageChange() {
			if (this.radioValue === 4) {
				this.average01 = this.checkNumber(this.average01, this.fullYear, this.fullYear + 100)
				this.average02 = this.checkNumber(this.average02, 1, 10)
				const averageTotal = `${this.average01}/${this.average02}`;
				this.$emit('update', 'year', averageTotal);
			}
		},
		// checkbox值变化时
		checkboxChange() {
			if (this.radioValue === 5) {
				this.$emit('update', 'year', this.checkboxString);
			}
		}
	}
})
</script>
