Template.onboarding.events({
  'click button.onboarding-0': function () {
    Session.set("onboarding", 1);
  },
  'click button.onboarding-1': function () {
    Session.set("onboarding", 0);
  }
});

Template.onboarding.helpers({
  onboardingHowtoRead: function() {
    return Session.get("onboarding")!==1;
  }
});
