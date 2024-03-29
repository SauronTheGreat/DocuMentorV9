class Ability
  include CanCan::Ability

  def initialize(user)

    # Define abilities for the passed in user here. For example:
    #
    #   user ||= User.new # guest user (not logged in)
    #   if user.admin?
    #     can :manage, :all
    #   else
    #     can :read, :all
    #   end

    can :read, :all # allow everyone to read everything
    if user
      if user.has_role? :admin
        can :manage, :all # allow admins to do anything
        can :access, :rails_admin # only allow admin users to access Rails Admin
        can :dashboard # allow access to dashboard
      elsif user.has_role? :author
        can :access, :rails_admin # only allow admin users to access Rails Admin
      elsif user.has_role? :manager
        can :manage, [User, Product] # allow managers to do anything to products and users
      end
    end

    #
    # The first argument to `can` is the action you are giving the user permission to do.
    # If you pass :manage it will apply to every action. Other common actions here are
    # :read, :create, :update and :destroy.
    #
    # The second argument is the resource the user can perform the action on. If you pass
    # :all it will apply to every resource. Otherwise pass a Ruby class of the resource.
    #
    # The third argument is an optional hash of conditions to further filter the objects.
    # For example, here the user can only update published articles.
    #
    #   can :update, Article, :published => true
    #
    # See the wiki for details: https://github.com/ryanb/cancan/wiki/Defining-Abilities
  end
end
