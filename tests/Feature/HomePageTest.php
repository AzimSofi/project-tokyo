<?php

it('returns a successful response', function () {
    $user = App\Models\User::factory()->create();
    $response = $this->actingAs($user)->get('/');

    $response->assertStatus(200);
});

it('redirects guests to the login page', function () {
    $response = $this->get('/');
    $response->assertRedirect(route('login'));
});
