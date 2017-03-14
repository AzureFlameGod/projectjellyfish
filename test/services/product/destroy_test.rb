require 'test_helper'

class Product::DestroyTest < ActiveSupport::TestCase
  test 'should destroy product' do
    assert_difference 'Product.count', -1 do
      result = Product::Destroy.run(context: users(:manager),
        params: {
          id: products(:cheap_setup).id,
        })
      assert result.valid?
    end
  end
end
