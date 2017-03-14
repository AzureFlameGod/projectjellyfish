require 'test_helper'

class ProductCategory::DestroyTest < ActiveSupport::TestCase

  test 'should destroy a product category' do
    assert_difference 'ProductCategory.count', -1 do
      result = ProductCategory::Destroy.run(context: users(:manager),
        params: {
          id: product_categories(:servers).id,
        })
      assert result.valid?
    end

  end
end
