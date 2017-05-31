require 'test_helper'

class Product::UpdateTest < ActiveSupport::TestCase
  setup do
    @product = products :cloud_forms_automation

    @settings = { miq_namespace: 'namespace', miq_class: 'class', miq_instance: 'instance' }
    @attributes = {
      name: 'Updated Product',
      description: 'Updated description',
      setup_price: '1.99',
      hourly_price: '2.99',
      monthly_price: '3.99',
      properties: [],
      settings: @settings,
      tag_list: %w(one two three four)
    }
  end

  test 'should update a product' do
    user = users :admin

    context = user
    params = { id: @product.id, data: { type: 'products', attributes: @attributes } }
    result = Product::Update.run(context: context, params: params)

    assert_equal true, result.valid?
    @product.reload
    assert_equal CloudForms::Automation::Product, @product.class
    assert_equal 'CloudForms::Automation::Product', @product.type
    assert_equal 'Updated Product', @product.name
    assert_equal 'Updated description', @product.description
    assert_equal BigDecimal('1.99'), @product.setup_price
    assert_equal BigDecimal('2.99'), @product.hourly_price
    assert_equal BigDecimal('3.99'), @product.monthly_price
    assert_equal %w(one two three four), @product.tag_list
  end
end
