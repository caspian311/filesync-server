
Feature: main page
   Scenario: main page shows up with appropriate content
      Given I am a user
      When I go to the main page
      Then I should see "Welcome to Filesync"
