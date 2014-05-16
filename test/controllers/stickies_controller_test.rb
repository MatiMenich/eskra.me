require 'test_helper'

class StickiesControllerTest < ActionController::TestCase
  setup do
    @sticky = stickies(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:stickies)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create sticky" do
    assert_difference('Stickie.count') do
      post :create, sticky: { color: @sticky.color, column_id: @sticky.column_id, name: @sticky.name, row_id: @sticky.row_id, text: @sticky.text, url: @sticky.url }
    end

    assert_redirected_to sticky_path(assigns(:sticky))
  end

  test "should show sticky" do
    get :show, id: @sticky
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @sticky
    assert_response :success
  end

  test "should update sticky" do
    patch :update, id: @sticky, sticky: { color: @sticky.color, column_id: @sticky.column_id, name: @sticky.name, row_id: @sticky.row_id, text: @sticky.text, url: @sticky.url }
    assert_redirected_to sticky_path(assigns(:sticky))
  end

  test "should destroy sticky" do
    assert_difference('Stickie.count', -1) do
      delete :destroy, id: @sticky
    end

    assert_redirected_to stickies_path
  end
end
