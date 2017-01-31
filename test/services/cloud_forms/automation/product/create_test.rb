require 'test_helper'

class CloudForms::Automation::Product::CreateTest < ActiveSupport::TestCase
  setup do
    @product_type = product_types :cloud_forms_automation
    @provider = providers :cloud_forms
    @settings = { miq_namespace: 'namespace', miq_class: 'class', miq_instance: 'instance' }
    @attributes = {
      product_type_id: @product_type.id,
      provider_id: @provider.id,
      name: 'Test Product',
      description: 'Test description',
      setup_price: '1.99',
      hourly_price: '0.009',
      monthly_price: '99.99',
      properties: [],
      settings: @settings,
      tag_list: %w(one two)
    }
  end

  test 'should set settings' do
    user = users :admin

    context = user
    params = { data: { type: 'products', attributes: @attributes } }
    result = Product::Create.run(context: context, params: params)

    assert_equal true, result.valid?
    product = Product.find result.model.id
    assert_equal 'namespace', product.miq_namespace
    assert_equal 'class', product.miq_class
    assert_equal 'instance', product.miq_instance
  end

  test 'should require miq_namespace setting' do
    user = users :admin

    context = user
    @settings.delete :miq_namespace
    params = { data: { type: 'products', attributes: @attributes } }
    result = Product::Create.run(context: context, params: params)

    assert_equal false, result.valid?
    assert_equal 1, result.errors.length
    error = result.errors.first
    assert_equal 'VALIDATION_ERROR', error.code
    assert_equal '`/data/attributes/settings/miq_namespace` is missing', error.detail
  end

  test 'should require miq_class setting' do
    user = users :admin

    context = user
    @settings.delete :miq_class
    params = { data: { type: 'products', attributes: @attributes } }
    result = Product::Create.run(context: context, params: params)

    assert_equal false, result.valid?
    assert_equal 1, result.errors.length
    error = result.errors.first
    assert_equal 'VALIDATION_ERROR', error.code
    assert_equal '`/data/attributes/settings/miq_class` is missing', error.detail
  end

  test 'should require miq_instance setting' do
    user = users :admin

    context = user
    @settings.delete :miq_instance
    params = { data: { type: 'products', attributes: @attributes } }
    result = Product::Create.run(context: context, params: params)

    assert_equal false, result.valid?
    assert_equal 1, result.errors.length
    error = result.errors.first
    assert_equal 'VALIDATION_ERROR', error.code
    assert_equal '`/data/attributes/settings/miq_instance` is missing', error.detail
  end
end
