
Feature: files page
   Scenario: files page shows existing files
      Given I am a logged in user
      And I have existing files
      When I go to the files page
      Then I should see my existing files
