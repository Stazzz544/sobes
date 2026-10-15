import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { REVIEW_ACTION } from '../config';

export const useReviewReminderTap = (onReview: () => void): void => {
  const response = Notifications.useLastNotificationResponse();

  useEffect(() => {
    if (!response || response.actionIdentifier !== Notifications.DEFAULT_ACTION_IDENTIFIER) {
      return;
    }
    Notifications.clearLastNotificationResponse();
    if (response.notification.request.content.data?.action === REVIEW_ACTION) {
      onReview();
    }
  }, [response, onReview]);
};
