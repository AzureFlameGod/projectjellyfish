require 'test_helper'

class ProjectRequestMailerTest < ActionMailer::TestCase
  setup do
    prc = ProjectRequest::Create.run context: users(:user),
      params: { data:
        { type: 'project_requests',
          attributes: { name: 'email test', request_message: 'Please create me', budget: '100' }
        }
      }
    @pr = prc.model
  end
  test 'needs approval' do
    assert_emails 1 do
      perform_enqueued_jobs do
        ProjectRequest::Create.run context: users(:user),
          params: { data:
            { type: 'project_requests',
              attributes: { name: 'for email', request_message: 'Please create me', budget: '100' }
            }
          }

      end
    end
    email = ActionMailer::Base.deliveries.last

    assert_equal [users(:manager).email], email.bcc
  end

  test 'approved' do

    assert_emails 1 do
      perform_enqueued_jobs do

        result = ProjectRequest::Approval::Create.run context: users(:manager),
          params: { project_request_id: @pr.id,
            data:
              { type: 'project_request/approvals',
                attributes:
                  { approval: 'approve', budget: '100', reason_message: 'Why not' }
              }
          }
      end
    end
    email = ActionMailer::Base.deliveries.last

    assert_equal [users(:user).email], email.to
    assert_match /approved/, email.subject
    assert_match @pr.name, email.subject
  end

  test 'denied' do
    assert_emails 1 do
      perform_enqueued_jobs do

        result = ProjectRequest::Approval::Create.run context: users(:manager),
          params: { project_request_id: @pr.id,
            data:
              { type: 'project_request/approvals',
                attributes:
                  { approval: 'deny', budget: '100', reason_message: 'Why not' }
              }
          }
      end
    end
    email = ActionMailer::Base.deliveries.last

    assert_equal [users(:user).email], email.to
    assert_match /denied/, email.subject
    assert_match @pr.name, email.subject
  end
end
