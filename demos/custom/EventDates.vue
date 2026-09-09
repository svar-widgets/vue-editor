<script setup>
defineOptions({ name: "EditorEventDates", inheritAttrs: false });

import { DatePicker, TimePicker, Switch } from "@svar-ui/vue-core";

// item handler props: the widget passes value / error / onchange
const props = defineProps({
	value: {},
	error: {},
	onchange: { type: Function },
});

const update = part =>
	props.onchange?.({ value: { ...props.value, ...part } });

const midnight = d => {
	if (!d) return d;
	const out = new Date(d);
	out.setHours(0, 0, 0, 0);
	return out;
};

// calendar returns the picked day at midnight; keep the current time part
function pickDate(key, day) {
	const current = props.value[key];
	let next = day;
	if (day && current && !props.value.isFullDay) {
		next = new Date(day);
		next.setHours(current.getHours(), current.getMinutes(), 0, 0);
	}
	update({ [key]: next });
}

// time picker returns hours/minutes only; keep the current date part
function pickTime(key, time) {
	const current = props.value[key];
	if (!current) return;
	const next = new Date(current);
	next.setHours(time.getHours(), time.getMinutes(), 0, 0);
	update({ [key]: next });
}

function toggleFullDay({ value: isFullDay }) {
	// switching to all-day snaps both dates to midnight
	update(
		isFullDay
			? {
					isFullDay,
					start: midnight(props.value.start),
					end: midnight(props.value.end),
				}
			: { isFullDay }
	);
}
</script>

<template>
	<div class="wx-event-dates" :class="{ 'wx-error': !!props.error }">
		<div class="wx-date">
			<DatePicker
				:value="props.value.start"
				:onchange="ev => pickDate('start', ev.value)"
			/>
		</div>
		<div v-if="!props.value.isFullDay" class="wx-time">
			<TimePicker
				:value="props.value.start"
				:onchange="ev => pickTime('start', ev.value)"
			/>
		</div>
		<span>&mdash;</span>
		<div class="wx-date">
			<DatePicker
				:value="props.value.end"
				:onchange="ev => pickDate('end', ev.value)"
			/>
		</div>
		<div v-if="!props.value.isFullDay" class="wx-time">
			<TimePicker
				:value="props.value.end"
				:onchange="ev => pickTime('end', ev.value)"
			/>
		</div>
		<label class="wx-full-day">
			<Switch :value="props.value.isFullDay" :onchange="toggleFullDay" />
			All day
		</label>
	</div>
</template>

<style scoped>
.wx-event-dates {
	display: flex;
	align-items: center;
	gap: 8px;
}
.wx-date {
	flex: 1;
}
.wx-time {
	flex: none;
	width: 96px;
}
.wx-full-day {
	display: flex;
	align-items: center;
	gap: 6px;
	white-space: nowrap;
	cursor: pointer;
}
.wx-error :deep(input) {
	border-color: var(--wx-color-danger);
}
</style>
