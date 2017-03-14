require 'test_helper'

class ProductCategory::UpdateTest < ActiveSupport::TestCase
  test 'should update a product category' do
    category_name = 'category name'
    product_category = product_categories(:servers)
    result = ProductCategory::Update.run(context: users(:manager),
      params: {
        id: product_category.id,
        data: {
          type: 'product_categories',
          attributes: {
            name: category_name,
            description: product_category.description,
            tag_list: product_category.tag_list
          }
        }
      })
    assert result.valid?
    assert_equal category_name, result.model.name
  end
end
