require 'test_helper'

class Product::SearchTest < ActiveSupport::TestCase
  setup do
    @user = users :user

    @context = @user
    @params = {}
  end

  test 'should get all products' do
    result = Product::Search.run(context: @context, params: @params)

    assert result.valid?
    assert_equal Product.count, result.model.length
  end

  test 'should get sorted results by default' do
    result = Product::Search.run(context: @context, params: @params)

    assert result.valid?
    product = Product.order(name: :asc).first
    assert_equal product.name, result.model.first.name
  end

  test 'should allow reverse sorting' do
    result = Product::Search.run(context: @context, params: { sort: { name: :desc } })

    assert result.valid?
    products = Product.order(name: :desc).all
    assert_equal products.first.name, result.model.first.name
    assert_equal products.last.name, result.model.last.name
  end

  test 'should allow sorting by multiple attributes' do
    result = Product::Search.run(context: @context, params: { sort: { name: :desc, updated_at: :asc } })

    assert result.valid?
    products = Product.order(name: :desc, updated_at: :asc).all
    assert_equal products.first.name, result.model.first.name
    assert_equal products.last.name, result.model.last.name
  end

  test 'accepts associations to include' do
    result = Product::Search.run(context: @context, params: { include: [:provider] })

    assert result.valid?
    assert result.model.includes_values.include? :provider
    refute result.model.includes_values.include? :product_type
  end

  test 'accepts multiple associations to include' do
    result = Product::Search.run(context: @context, params: { include: [:provider, :product_type] })

    assert result.valid?
    assert result.model.includes_values.include? :provider
    assert result.model.includes_values.include? :product_type
  end

  test 'allow filtering using scopes' do
    result = Product::Search.run(context: @context, params: { filter: [{ tagged_with: 'cloudforms' }] })

    products = Product.tagged_with 'cloudforms'

    assert result.valid?
    assert_equal products.length, result.model.length
  end
end
