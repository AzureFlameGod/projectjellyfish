require 'test_helper'

class ProductCategory::CreateTest < ActiveSupport::TestCase

  test 'should create a product category' do
    category_name = 'category name'
    assert_difference 'ProductCategory.count', 1 do
      result = ProductCategory::Create.run(context: users(:manager), params: {
        data: {
          type: 'product_categories',
          attributes: {
            name: category_name,
            description: 'description',
            tag_list: %w(tag1 tag2)
          }
        }
      })
      assert result.valid?
      assert_equal category_name, result.model.name
    end
  end
end
