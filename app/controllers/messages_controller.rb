class MessagesController < ApplicationController

  before_action :set_group

  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
  end

  def create
    @message = @group.messages.new(message_params)
    if @message.save
      redirect_to group_messages_path(@group), notice: 'メッセージが送信されました'
    else
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = 'メッセージを入力してください。'
      render :index
    end
  end

  private

  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end



# def new
#   @group = Group.new
#   @group.users << current_user
# end

# def create
#   @group = Group.new(group_params)
#   if @group.save
#     redirect_to root_path, notice: 'グループを作成しました'
#   else
#     render :new
#   end
# end

# def edit
# end


# def update
#   if @group.update(group_params)
#     redirect_to group_messages_path(@group), notice: 'グループを編集しました'
#   else
#     render :edit
#   end
# end
# private

# def group_params
#   params.require(:group).permit(:name, user_ids: [] )
# end

# def set_group
#   @group = Group.find(params[:id])
# end
# end