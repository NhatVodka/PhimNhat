import React, { useEffect, useState } from "react";

import {
  onCurrentUserSubscriptionUpdate,
  Subscription,
} from "@stripe/firestore-stripe-payments";
import payments from "../lib/stripe";
const useSubscription = (user) => {
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    if (!user) return;
    onCurrentUserSubscriptionUpdate(payments, (snapshot) => {
      setSubscription(
        snapshot.subscriptions.filter(
          (subscription) =>
            subscription.status === "active" ||
            subscription.status === "trialing"
        )[0]
      );
    });
  }, [user]);
  return subscription;
};

export default useSubscription;
