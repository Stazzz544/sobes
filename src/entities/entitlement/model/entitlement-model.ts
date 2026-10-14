import { createEvent, createStore, sample } from 'effector';
import { LOCKED_FEATURES } from '../config/features';
import type { ProFeature } from '../config/features';

const devProToggled = createEvent<boolean>();

const $isPro = createStore(false);

sample({ clock: devProToggled, filter: () => __DEV__, target: $isPro });

export const isFeatureLocked = (feature: ProFeature, isPro: boolean): boolean => !isPro && LOCKED_FEATURES.includes(feature);

export const entitlementModel = { $isPro, devProToggled };
